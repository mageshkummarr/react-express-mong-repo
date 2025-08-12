#!/bin/bash
set -e  # Exit on any error

echo "Starting server script..."

# Navigate to app directory
cd /home/ec2-user/app || { echo "Failed to change directory"; exit 1; }

echo "Current directory: $(pwd)"
echo "Files in directory: $(ls -la)"

# Install dependencies
echo "Installing npm dependencies..."
npm install --production || { echo "npm install failed"; exit 1; }

# Stop any existing PM2 processes
echo "Stopping existing PM2 processes..."
pm2 stop server 2>/dev/null || echo "No existing server process"
pm2 delete server 2>/dev/null || echo "No server process to delete"

# Start the server
echo "Starting server with PM2..."
pm2 start server.js --name server || { echo "Failed to start server"; exit 1; }

# Save PM2 configuration
pm2 save || echo "Failed to save PM2 config"

echo "Server started successfully"
