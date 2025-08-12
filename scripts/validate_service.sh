#!/bin/bash
sleep 30
curl -f http://localhost:3000/health || exit 1
echo "Service validation successful"
