@echo off
REM Auto-start worker script for Windows

echo Starting LinkedIn Automation Worker...
start /B npm run worker
echo Worker started in background
