#!/bin/bash

STACK_NAME="airwing-stack"
CLEANUP_SUCCESS=true

echo "Starting cleanup process..."

# Find and empty S3 buckets with airline-airwing- prefix
echo "Finding S3 buckets with prefix 'airline-airwing-'..."
BUCKETS=$(AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 \
aws s3api list-buckets --query "Buckets[?starts_with(Name, 'airline-airwing-')].Name" --output text)

if [ -n "$BUCKETS" ]; then
    for BUCKET in $BUCKETS; do
        echo "Emptying bucket: $BUCKET"
        AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 \
        aws s3 rm s3://$BUCKET --recursive
        
        if [ $? -ne 0 ]; then
            echo "WARNING: Failed to empty bucket $BUCKET"
            CLEANUP_SUCCESS=false
        fi
    done
else
    echo "No airline-airwing- buckets found"
fi

# Delete CloudFormation stack
echo "Deleting CloudFormation stack: $STACK_NAME"
AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 \
aws cloudformation delete-stack --stack-name $STACK_NAME

if [ $? -eq 0 ]; then
    echo "Stack deletion initiated. Waiting for completion..."
    
    # Wait for stack deletion to complete
    AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 \
    aws cloudformation wait stack-delete-complete --stack-name $STACK_NAME
    
    # Verify stack is deleted
    STACK_STATUS=$(AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 \
    aws cloudformation describe-stacks \
        --stack-name $STACK_NAME \
        --query "Stacks[0].StackStatus" \
        --output text 2>/dev/null)
    
    if [ $? -ne 0 ] || [ -z "$STACK_STATUS" ]; then
        echo "SUCCESS: Stack $STACK_NAME deleted successfully"
    else
        echo "FAILURE: Stack deletion failed with status: $STACK_STATUS"
        CLEANUP_SUCCESS=false
    fi
else
    echo "FAILURE: Failed to initiate stack deletion"
    CLEANUP_SUCCESS=false
fi

# Final status
if [ "$CLEANUP_SUCCESS" = true ]; then
    echo "SUCCESS: All resources deleted successfully"
    exit 0
else
    echo "FAILURE: Some resources could not be deleted"
    exit 1
fi