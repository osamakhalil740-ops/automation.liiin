/**
 * NEXORA LinkedIn Automation Worker - Complete Implementation
 * Implements proper keyword loop, reach targeting, and comment assignment
 */

import { chromium } from 'playwright';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function randomDelay(minMins: number, maxMins: number) {
    const mins = minMins + Math.random() * (maxMins - minMins);
    const ms = mins * 60 * 1000;
    console.log(`⏳ Waiting ${mins.toFixed(1)} minutes until next cycle...`);
    await sleep(ms);
}

async function logAction(userId: string, description: string, status: string) {
    try {
        await prisma.activityFeed.create({
            data: { userId, description, status }
        });
    } catch (error) {
        console.error('Log error:', error);
    }
}

async function runPipelineForUser(userId: string, sessionCookie: string, settings: any) {
    console.log(`\n========================================`);
    console.log(`👤 Processing User: ${userId.slice(0, 8)}...`);
    console.log(`========================================`);

    // 1. Check daily limit
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const commentsToday = await prisma.activityFeed.count({
        where: {
            userId,
            status: 'Success',
            description: { contains: 'Commented on post' },
            createdAt: { gte: today }
        }
    });

    if (commentsToday >= settings.maxCommentsPerDay) {
        console.log(`   ⚠️  Daily limit reached (${commentsToday}/${settings.maxCommentsPerDay}). Skipping.`);
        return;
    }

    // 2. Fetch keywords WITH their comments
    const keywords = await prisma.keyword.findMany({
        where: { userId, active: true },
        include: { comments: true }
    });

    const generalComments = await prisma.comment.findMany({
        where: { userId, keywordId: null }
    });

    if (keywords.length === 0) {
        console.log(`   ⚠️  No keywords found. Skipping user.`);
        return;
    }

    console.log(`   📋 Found ${keywords.length} active keywords`);
    console.log(`   💬 General comments available: ${generalComments.length}`);

    // 3. Launch browser
    console.log(`   🌐 Launching browser...`);
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });

    await context.addCookies([{
        name: 'li_at',
        value: sessionCookie,
        domain: '.linkedin.com',
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    }]);

    const page = await context.newPage();

    try {
        let totalCommentsPosted = 0;

        // 4. LOOP THROUGH ALL KEYWORDS
        for (let keywordIndex = 0; keywordIndex < keywords.length; keywordIndex++) {
            const keyword = keywords[keywordIndex];
            const targetReach = keyword.targetReach || 1000;

            console.log(`\n   [${keywordIndex + 1}/${keywords.length}] 🔍 Keyword: "${keyword.keyword}"`);
            console.log(`   🎯 Target reach: ${targetReach} likes`);
            console.log(`   💬 Linked comments: ${keyword.comments.length}`);

            // Check daily limit
            if (totalCommentsPosted >= settings.maxCommentsPerDay) {
                console.log(`   ⚠️  Daily limit reached. Stopping.`);
                break;
            }

            // 5. Search LinkedIn
            const searchUrl = `https://www.linkedin.com/search/results/content/?keywords=${encodeURIComponent(keyword.keyword)}&sortBy=date_posted`;
            console.log(`   🔎 Searching LinkedIn...`);
            await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
            await sleep(3000);

            try {
                await page.waitForSelector('.feed-shared-update-v2', { timeout: 10000 });

                let bestPost: any = null;
                let bestPostReach = 0;
                let bestPostDiff = Infinity;

                // 6. SCROLL AND ANALYZE POSTS
                console.log(`   📜 Scrolling to find posts matching target reach...`);
                
                for (let scrollAttempt = 0; scrollAttempt < 3; scrollAttempt++) {
                    const posts = await page.$$('.feed-shared-update-v2');
                    console.log(`   📄 Scroll ${scrollAttempt + 1}/3: Found ${posts.length} posts`);

                    for (const post of posts) {
                        const likesText = await post.$eval('.social-details-social-counts__reactions-count', el => (el as HTMLElement).innerText).catch(() => '0');
                        const commentsText = await post.$eval('.social-details-social-counts__comments', el => (el as HTMLElement).innerText).catch(() => '0');

                        const likes = parseInt(likesText.replace(/[^0-9]/g, '')) || 0;
                        const totalComments = parseInt(commentsText.replace(/[^0-9]/g, '')) || 0;

                        // 7. CHECK REACH CRITERIA
                        if (likes >= settings.minLikes && likes <= settings.maxLikes &&
                            totalComments >= settings.minComments && totalComments <= settings.maxComments) {
                            
                            const diff = Math.abs(likes - targetReach);
                            console.log(`   📊 Post found: ${likes} likes, ${totalComments} comments (diff: ${diff})`);

                            // Find closest match to target reach
                            const tolerance = targetReach * 0.3; // 30% tolerance
                            if (diff <= tolerance && diff < bestPostDiff) {
                                bestPost = post;
                                bestPostReach = likes;
                                bestPostDiff = diff;
                                console.log(`   ✨ New best match: ${likes} likes (target: ${targetReach})`);
                            }
                        }
                    }

                    // Scroll for more posts
                    if (scrollAttempt < 2) {
                        await page.mouse.wheel(0, 800);
                        await sleep(2000);
                    }
                }

                // 8. POST COMMENT IF MATCH FOUND
                if (bestPost && bestPostReach > 0) {
                    console.log(`   🎯 Selected post: ${bestPostReach} likes (target: ${targetReach})`);

                    // 9. SELECT COMMENT (keyword-specific or general)
                    const availableComments = keyword.comments.length > 0 
                        ? keyword.comments 
                        : generalComments;

                    if (availableComments.length === 0) {
                        console.log(`   ❌ No comments available for "${keyword.keyword}"`);
                        continue;
                    }

                    const comment = availableComments[Math.floor(Math.random() * availableComments.length)];
                    console.log(`   💬 Comment: "${comment.text.substring(0, 50)}..."`);
                    console.log(`   🔗 Source: ${keyword.comments.length > 0 ? 'Keyword-specific' : 'General pool'}`);

                    // 10. PERFORM COMMENTING
                    try {
                        const commentBtn = await bestPost.$('.comment-button');
                        if (commentBtn) {
                            await commentBtn.hover();
                            await sleep(500 + Math.random() * 500);
                            await commentBtn.click();
                            await sleep(2000);

                            const editor = await bestPost.$('.ql-editor');
                            if (editor) {
                                await editor.type(comment.text, { delay: 80 });
                                await sleep(1500);

                                let submitBtn = await bestPost.$('.comments-comment-box__submit-button--cr');
                                if (!submitBtn) submitBtn = await bestPost.$('.comments-comment-box__submit-button');
                                if (!submitBtn) submitBtn = await bestPost.$('button[type="submit"]');

                                if (submitBtn) {
                                    await submitBtn.hover();
                                    await sleep(800);
                                    await submitBtn.click();
                                    await sleep(2000);

                                    totalCommentsPosted++;
                                    await logAction(userId, `✅ Commented on post (${bestPostReach} likes) for "${keyword.keyword}"`, 'Success');
                                    console.log(`   ✅ Comment posted successfully! Total today: ${totalCommentsPosted}`);

                                    // Update keyword matches
                                    await prisma.keyword.update({
                                        where: { id: keyword.id },
                                        data: { matches: { increment: 1 } }
                                    });

                                    // Update comment usage
                                    await prisma.comment.update({
                                        where: { id: comment.id },
                                        data: { timesUsed: { increment: 1 } }
                                    });
                                } else {
                                    console.log(`   ❌ Submit button not found`);
                                }
                            }
                        }
                    } catch (err: any) {
                        await logAction(userId, `Failed to comment: ${err.message}`, 'Failed');
                        console.log(`   ❌ Error: ${err.message}`);
                    }
                } else {
                    console.log(`   ⚠️  No posts found matching target reach ${targetReach}`);
                    await logAction(userId, `No matches for "${keyword.keyword}" (target: ${targetReach})`, 'No matches');
                }

            } catch (e) {
                console.log(`   ❌ No posts loaded for "${keyword.keyword}"`);
            }

            // Wait between keywords
            if (keywordIndex < keywords.length - 1) {
                const waitTime = 3000 + Math.random() * 2000;
                console.log(`   ⏳ Waiting ${(waitTime/1000).toFixed(1)}s before next keyword...`);
                await sleep(waitTime);
            }
        }

        console.log(`\n   📊 Summary: Posted ${totalCommentsPosted} comments across ${keywords.length} keywords`);
        await logAction(userId, `Cycle completed: ${totalCommentsPosted} comments posted`, 'System');

    } finally {
        await browser.close();
        console.log(`   🔒 Browser closed`);
    }
}

async function runOrchestrator() {
    console.log('\n========================================');
    console.log('  🚀 NEXORA Worker v3.0 Starting...');
    console.log('========================================\n');

    while (true) {
        try {
            const activeSettings = await prisma.settings.findMany({
                where: {
                    systemActive: true,
                    NOT: { linkedinSessionCookie: '' }
                }
            });

            if (activeSettings.length === 0) {
                console.log('⏳ No active users. Waiting 60s...');
                await sleep(60000);
                continue;
            }

            console.log(`👥 Found ${activeSettings.length} active user(s)`);

            for (const userSettings of activeSettings) {
                if (!userSettings.userId) continue;
                try {
                    await runPipelineForUser(userSettings.userId, userSettings.linkedinSessionCookie, userSettings);
                    await sleep(10000);
                } catch (err: any) {
                    console.error(`❌ Error for user: ${err.message}`);
                    await logAction(userSettings.userId, `Worker error: ${err.message}`, 'Failed').catch(() => {});
                }
            }

            const minDelay = Math.min(...activeSettings.map(s => s.minDelayMins));
            const maxDelay = Math.max(...activeSettings.map(s => s.maxDelayMins));
            await randomDelay(minDelay, maxDelay);

        } catch (error: any) {
            console.error('❌ Fatal error:', error.message);
            await sleep(60000);
        }
    }
}

runOrchestrator();
