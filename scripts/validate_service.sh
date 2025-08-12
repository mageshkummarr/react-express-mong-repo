#!/bin/bash
sleep 30
curl -f http://localhost:5000/health || exit 1
echo "Service validation successful"
