#!/bin/bash
sleep 30
netstat -an|grep 5000 || exit 1
echo "Service validation successful"
