import { NextResponse } from 'next/server';

export async function GET() {
    const isRunning = global._workerProcess && !global._workerProcess.exitCode;
    
    return NextResponse.json({
        status: isRunning ? 'running' : 'stopped',
        pid: isRunning ? global._workerProcess?.pid : null
    });
}
