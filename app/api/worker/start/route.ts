/**
 * API endpoint to start the worker process ONLY when user clicks "Start" button
 * ✅ FIXED: Worker only starts on explicit user action, never automatically
 * ✅ FIXED: Worker is tied to specific user session - no cross-account processing
 */

import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import { getUserFromToken } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Global worker process reference
declare global {
    var _workerProcess: any;
    var _workerStartTime: number;
    var _workerUserId: string | null; // Track which user owns the worker
}

export async function POST() {
    try {
        // ✅ CRITICAL: Verify user is authenticated
        const userId = await getUserFromToken();
        if (!userId) {
            console.log('❌ [API] Unauthorized - No valid session');
            return NextResponse.json({
                success: false,
                error: 'Unauthorized - Please log in'
            }, { status: 401 });
        }

        console.log(`\n🚀 [API] User ${userId.slice(0, 8)} clicked "Start" button - Starting worker...`);
        
        // ✅ CRITICAL: If worker exists, check if it belongs to a DIFFERENT user
        if (global._workerProcess && !global._workerProcess.killed) {
            const existingWorkerUserId = global._workerUserId;
            
            if (existingWorkerUserId && existingWorkerUserId !== userId) {
                // Different user - KILL old worker and start fresh
                console.log(`⚠️ [API] Worker belongs to different user (${existingWorkerUserId.slice(0, 8)})`);
                console.log(`🔄 [API] Terminating old worker and starting fresh for user ${userId.slice(0, 8)}...`);
                
                try {
                    global._workerProcess.kill('SIGTERM');
                    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for cleanup
                } catch (e) {
                    console.log('⚠️ [API] Failed to kill old worker, continuing anyway...');
                }
                
                global._workerProcess = null;
                global._workerUserId = null;
            } else {
                // Same user - worker already running
                console.log(`✅ [API] Worker already running for this user - PID: ${global._workerProcess.pid}`);
                return NextResponse.json({
                    success: true,
                    message: 'Worker already running for your account',
                    pid: global._workerProcess.pid,
                    uptime: Date.now() - (global._workerStartTime || Date.now())
                });
            }
        }
        
        // ✅ CRITICAL: Clear systemActive for ALL other users to prevent cross-account execution
        console.log('🧹 [API] Clearing systemActive flag for all other users...');
        await prisma.settings.updateMany({
            where: {
                userId: { not: userId }
            },
            data: {
                systemActive: false
            }
        });
        console.log('✅ [API] Ensured ONLY current user can be processed by worker');

        // ✅ USER ACTION: Start the worker process
        const workerPath = path.join(process.cwd(), 'worker.ts');
        
        console.log('📂 [API] Worker path:', workerPath);
        console.log('✅ [API] Spawning worker process...');
        
        const workerProcess = spawn('npx', ['tsx', workerPath], {
            detached: true,
            stdio: ['ignore', 'pipe', 'pipe'],
            cwd: process.cwd()
        });

        // Store process globally WITH user tracking
        global._workerProcess = workerProcess;
        global._workerStartTime = Date.now();
        global._workerUserId = userId; // ✅ Track which user owns this worker

        console.log(`✅ [API] Worker started - PID: ${workerProcess.pid}`);
        console.log(`✅ [API] Worker assigned to user: ${userId.slice(0, 8)}`);

        // Log worker output
        workerProcess.stdout?.on('data', (data) => {
            console.log(`[WORKER] ${data.toString().trim()}`);
        });

        workerProcess.stderr?.on('data', (data) => {
            console.error(`[WORKER ERROR] ${data.toString().trim()}`);
        });

        workerProcess.on('exit', (code) => {
            console.log(`[WORKER] Process exited with code ${code}`);
            console.log(`[WORKER] Clearing worker state for user: ${global._workerUserId?.slice(0, 8) || 'unknown'}`);
            global._workerProcess = null;
            global._workerUserId = null; // ✅ Clear user tracking
        });

        // Allow worker to start
        await new Promise(resolve => setTimeout(resolve, 2000));

        return NextResponse.json({
            success: true,
            message: 'Worker started by USER ACTION',
            pid: workerProcess.pid,
            userId: userId.slice(0, 8), // Return partial userId for confirmation
            startedAt: new Date().toISOString()
        });

    } catch (error: any) {
        console.error('❌ [API] Failed to start worker:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

export async function GET() {
    const isRunning = global._workerProcess && !global._workerProcess.killed;
    
    return NextResponse.json({
        running: isRunning,
        pid: global._workerProcess?.pid,
        uptime: isRunning ? Date.now() - (global._workerStartTime || Date.now()) : 0
    });
}
