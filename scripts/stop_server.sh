#!/bin/bash
cd /home/ec2-user/app
pm2 stop server || echo "Server not running"
pm2 delete server || echo "No server process to delete"
