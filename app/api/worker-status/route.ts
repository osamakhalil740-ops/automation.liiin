import { NextResponse } from 'next/server';

// Extend global type
declare global {
    var _workerProcess: any;
}

export async function GET() {
    const isRunning = global._workerProcess && !global._workerProcess.exitCode;
    return NextResponse.json({ 
        isRunning,
        pid: global._workerProcess?.pid 
    });
}
