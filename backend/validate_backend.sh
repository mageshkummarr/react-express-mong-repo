# Task 6: Verify backend application downloaded using SSM
instance_id=$(AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 aws ec2 describe-instances --filters "Name=instance-state-name,Values=running" "Name=tag:Name,Values=AirlineEC2Instance" --query "Reservations[].Instances[].InstanceId" --output text)

if [ -n "$instance_id" ]; then
    # Send SSM command
    command_id=$(AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 aws ssm send-command --instance-ids $instance_id --document-name "AWS-RunShellScript" --parameters 'commands=["ls -la /home/ec2-user/ | grep -i backend || ls -la /opt/ | grep -i backend"]' --query "Command.CommandId" --output text 2>/dev/null)
    
    # Get command result
    if [ -n "$command_id" ]; then
        sleep 5
        backend_check=$(AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 aws ssm get-command-invocation --command-id $command_id --instance-id $instance_id --query "Status" --output text 2>/dev/null)
        
        if [ "$backend_check" = "Success" ]; then
            BackendStatus="Success"
            BackendObservation="Backend application files found on EC2 instance"
            BackendFeedback="You have completed task 6"
            BackendScore=10
        else
            BackendStatus="Failure"
            BackendObservation="Backend application not found on EC2 instance"
            BackendFeedback="You have not completed task 6"
            BackendScore=0
        fi
    else
        BackendStatus="Failure"
        BackendObservation="Failed to send SSM command"
        BackendFeedback="You have not completed task 6"
        BackendScore=0
    fi
else
    BackendStatus="Failure"
    BackendObservation="No running EC2 instance found"
    BackendFeedback="You have not completed task 6"
    BackendScore=0
fi