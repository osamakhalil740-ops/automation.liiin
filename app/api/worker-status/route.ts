/**
 * Worker Status Endpoint - Check if worker is running
 */

import { NextResponse } from 'next/server';
import { streamManager } from '@/lib/worker-stream';

declare global {
    var _workerProcess: any;
    var _workerStartTime: number;
    var _workerUserId: string | null;
}

export async function GET() {
    const isRunning = global._workerProcess && !global._workerProcess.killed;
    
    return NextResponse.json({
        status: isRunning ? 'running' : 'stopped',
        pid: global._workerProcess?.pid,
        uptime: isRunning ? Date.now() - (global._workerStartTime || Date.now()) : 0,
        userId: global._workerUserId?.slice(0, 8) || null,
        activeConnections: streamManager.getSubscriberCount(),
        startedAt: isRunning && global._workerStartTime ? new Date(global._workerStartTime).toISOString() : null
    });
}

export async function POST() {
    // Stop worker
    if (global._workerProcess && !global._workerProcess.killed) {
        try {
            global._workerProcess.kill('SIGTERM');
            global._workerProcess = null;
            global._workerUserId = null;
            
            return NextResponse.json({
                success: true,
                message: 'Worker stopped successfully'
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                error: error.message
            }, { status: 500 });
        }
    }
    
    return NextResponse.json({
        success: false,
        error: 'Worker is not running'
    }, { status: 400 });
}