// Extend global type
declare global {
    var _workerProcess: any;
}

import { NextResponse } from 'next/server';

export async function GET() {
    const isRunning = global._workerProcess && !global._workerProcess.exitCode;
    
    return NextResponse.json({
        status: isRunning ? 'running' : 'stopped',
        pid: global._workerProcess?.pid
    });
}