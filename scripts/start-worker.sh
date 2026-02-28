#!/bin/bash
# Auto-start worker script for production deployment

echo "Starting LinkedIn Automation Worker..."
npm run worker &
echo "Worker started in background"
