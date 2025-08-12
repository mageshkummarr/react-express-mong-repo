#!/bin/bash
cd /home/ec2-user/app
npm install --production
pm2 start server.js --name server
pm2 save
pm2 startup
