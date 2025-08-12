#!/bin/bash

Total=0

# Task 1: Verify zip file uploaded to airline-airwing bucket
airline_bucket=$(AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 aws s3api list-buckets --query "Buckets[?starts_with(Name, 'airline-airwing-')].Name" --output text)
if [ -n "$airline_bucket" ]; then
    zip_files=$(AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 aws s3 ls s3://$airline_bucket --recursive | grep "\.zip$" | wc -l)
    if [ $zip_files -gt 0 ]; then
        ZipStatus="Success"
        ZipObservation="Zip file uploaded to $airline_bucket successfully"
        ZipFeedback="You have completed task 1"
        ZipScore=10
    else
        ZipStatus="Failure"
        ZipObservation="No zip file found in $airline_bucket"
        ZipFeedback="You have not completed task 1"
        ZipScore=0
    fi
else
    ZipStatus="Failure"
    ZipObservation="airline-airwing bucket not found"
    ZipFeedback="You have not completed task 1"
    ZipScore=0
fi
Total=`expr $Total + $ZipScore`

# Task 2: Verify frontend-react bucket created
frontend_bucket=$(AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 aws s3api list-buckets --query "Buckets[?starts_with(Name, 'frontend-react-')].Name" --output text)
if [ -n "$frontend_bucket" ]; then
    FrontendStatus="Success"
    FrontendObservation="Frontend bucket $frontend_bucket created successfully"
    FrontendFeedback="You have completed task 2"
    FrontendScore=10
else
    FrontendStatus="Failure"
    FrontendObservation="frontend-react bucket not found"
    FrontendFeedback="You have not completed task 2"
    FrontendScore=0
fi
Total=`expr $Total + $FrontendScore`

# Task 3: Verify bucket policy configured
if [ -n "$frontend_bucket" ]; then
    bucket_policy=$(AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 aws s3api get-bucket-policy --bucket $frontend_bucket 2>/dev/null)
    if [ $? -eq 0 ]; then
        PolicyStatus="Success"
        PolicyObservation="Bucket policy configured for $frontend_bucket"
        PolicyFeedback="You have completed task 3"
        PolicyScore=15
    else
        PolicyStatus="Failure"
        PolicyObservation="No bucket policy found for $frontend_bucket"
        PolicyFeedback="You have not completed task 3"
        PolicyScore=0
    fi
else
    PolicyStatus="Failure"
    PolicyObservation="Cannot verify bucket policy - frontend bucket not found"
    PolicyFeedback="You have not completed task 3"
    PolicyScore=0
fi
Total=`expr $Total + $PolicyScore`

# Task 4: Verify static website enabled
if [ -n "$frontend_bucket" ]; then
    website_config=$(AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 aws s3api get-bucket-website --bucket $frontend_bucket 2>/dev/null)
    if [ $? -eq 0 ]; then
        WebsiteStatus="Success"
        WebsiteObservation="Static website hosting enabled for $frontend_bucket"
        WebsiteFeedback="You have completed task 4"
        WebsiteScore=15
    else
        WebsiteStatus="Failure"
        WebsiteObservation="Static website hosting not enabled for $frontend_bucket"
        WebsiteFeedback="You have not completed task 4"
        WebsiteScore=0
    fi
else
    WebsiteStatus="Failure"
    WebsiteObservation="Cannot verify website hosting - frontend bucket not found"
    WebsiteFeedback="You have not completed task 4"
    WebsiteScore=0
fi
Total=`expr $Total + $WebsiteScore`

# Task 5: Verify React files uploaded
if [ -n "$frontend_bucket" ]; then
    react_files=$(AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 aws s3 ls s3://$frontend_bucket --recursive | grep -E "\.(html|js|css)$" | wc -l)
    if [ $react_files -gt 0 ]; then
        ReactStatus="Success"
        ReactObservation="React files uploaded to $frontend_bucket"
        ReactFeedback="You have completed task 5"
        ReactScore=15
    else
        ReactStatus="Failure"
        ReactObservation="No React files found in $frontend_bucket"
        ReactFeedback="You have not completed task 5"
        ReactScore=0
    fi
else
    ReactStatus="Failure"
    ReactObservation="Cannot verify React files - frontend bucket not found"
    ReactFeedback="You have not completed task 5"
    ReactScore=0
fi
Total=`expr $Total + $ReactScore`

# Task 6: Verify backend application downloaded using SSM
instance_id=$(AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 aws ec2 describe-instances --filters "Name=instance-state-name,Values=running" "Name=tag:Name,Values=AirlineEC2Instance" --query "Reservations[].Instances[].InstanceId" --output text)

if [ -n "$instance_id" ]; then
    command_id=$(AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 aws ssm send-command --instance-ids $instance_id --document-name "AWS-RunShellScript" --parameters 'commands=["ls -la /home/ec2-user/ | grep -i backend || ls -la /opt/ | grep -i backend"]' --query "Command.CommandId" --output text 2>/dev/null)
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
Total=`expr $Total + $BackendScore`

# Task 7: Verify Node Express application started using SSM
if [ -n "$instance_id" ]; then
    command_id=$(AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 aws ssm send-command --instance-ids $instance_id --document-name "AWS-RunShellScript" --parameters 'commands=["ps aux | grep node | grep -v grep"]' --query "Command.CommandId" --output text 2>/dev/null)
    if [ -n "$command_id" ]; then
        sleep 5
        node_check=$(AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 aws ssm get-command-invocation --command-id $command_id --instance-id $instance_id --query "Status" --output text 2>/dev/null)
        if [ "$node_check" = "Success" ]; then
            NodeStatus="Success"
            NodeObservation="Node Express application is running on EC2"
            NodeFeedback="You have completed task 7"
            NodeScore=10
        else
            NodeStatus="Failure"
            NodeObservation="Node Express application not running"
            NodeFeedback="You have not completed task 7"
            NodeScore=0
        fi
    else
        NodeStatus="Failure"
        NodeObservation="Failed to send SSM command"
        NodeFeedback="You have not completed task 7"
        NodeScore=0
    fi
else
    NodeStatus="Failure"
    NodeObservation="Cannot verify Node application - no EC2 instance"
    NodeFeedback="You have not completed task 7"
    NodeScore=0
fi
Total=`expr $Total + $NodeScore`

# Task 8: Verify MongoDB Atlas connection using SSM
if [ -n "$instance_id" ]; then
    command_id=$(AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 aws ssm send-command --instance-ids $instance_id --document-name "AWS-RunShellScript" --parameters 'commands=["grep -i mongodb /home/ec2-user/*/package.json || grep -i atlas /home/ec2-user/*/*.js"]' --query "Command.CommandId" --output text 2>/dev/null)
    if [ -n "$command_id" ]; then
        sleep 5
        mongo_check=$(AWS_ACCESS_KEY_ID=$1 AWS_SECRET_ACCESS_KEY=$2 aws ssm get-command-invocation --command-id $command_id --instance-id $instance_id --query "Status" --output text 2>/dev/null)
        if [ "$mongo_check" = "Success" ]; then
            DBStatus="Success"
            DBObservation="MongoDB Atlas connection configured"
            DBFeedback="You have completed task 8"
            DBScore=10
        else
            DBStatus="Failure"
            DBObservation="MongoDB Atlas connection not found"
            DBFeedback="You have not completed task 8"
            DBScore=0
        fi
    else
        DBStatus="Failure"
        DBObservation="Failed to send SSM command"
        DBFeedback="You have not completed task 8"
        DBScore=0
    fi
else
    DBStatus="Failure"
    DBObservation="Cannot verify database connection - no EC2 instance"
    DBFeedback="You have not completed task 8"
    DBScore=0
fi
Total=`expr $Total + $DBScore`

# Task 9: Verify application accessible via S3 static website endpoint using curl
if [ -n "$frontend_bucket" ] && [ "$WebsiteStatus" = "Success" ]; then
    website_endpoint="http://$frontend_bucket.s3-website.ap-south-1.amazonaws.com"
    curl_response=$(curl -s -o /dev/null -w "%{http_code}" $website_endpoint)
    if [ "$curl_response" = "200" ]; then
        AccessStatus="Success"
        AccessObservation="Application accessible via S3 static website endpoint"
        AccessFeedback="You have completed task 9"
        AccessScore=5
    else
        AccessStatus="Failure"
        AccessObservation="Application not accessible - HTTP status: $curl_response"
        AccessFeedback="You have not completed task 9"
        AccessScore=0
    fi
else
    AccessStatus="Failure"
    AccessObservation="Application not accessible - website hosting not configured"
    AccessFeedback="You have not completed task 9"
    AccessScore=0
fi
Total=`expr $Total + $AccessScore`

Result='@responsestart@ \n
{\n
        "Exercise": "Ex: Full Stack Application Deployment",\n
        "TestCases": [{ \n
        "Name": "Zip file uploaded to airline bucket", \n
        "Status": "'$ZipStatus'", \n
        "Skill": "Beginner", \n
        "Score": "'$ZipScore'% ",\n
        "Feedback": "'$ZipFeedback' ",\n    
        "Observation": "'$ZipObservation'",\n
        "ConsoleOutput": ""\n
        },
        {\n
        "Name": "Frontend React bucket created", \n
        "Status": "'$FrontendStatus'", \n
        "Skill": "Beginner", \n
        "Score": "'$FrontendScore'% ",\n
        "Feedback": "'$FrontendFeedback' ",\n
        "Observation": "'$FrontendObservation'",\n
        "ConsoleOutput": ""\n
        },
        {\n
        "Name": "Bucket policy configured", \n
        "Status": "'$PolicyStatus'", \n
        "Skill": "Intermediate", \n		
        "Score": "'$PolicyScore'% ",\n
        "Feedback": "'$PolicyFeedback' ",\n
        "Observation": "'$PolicyObservation'",\n
        "ConsoleOutput": ""\n
        },
        {\n
        "Name": "Static website enabled", \n
        "Status": "'$WebsiteStatus'", \n
        "Skill": "Intermediate", \n		
        "Score": "'$WebsiteScore'% ",\n
        "Feedback": "'$WebsiteFeedback' ",\n
        "Observation": "'$WebsiteObservation'",\n
        "ConsoleOutput": ""\n
        },
        {\n
        "Name": "React files uploaded", \n
        "Status": "'$ReactStatus'", \n
        "Skill": "Beginner", \n		
        "Score": "'$ReactScore'% ",\n
        "Feedback": "'$ReactFeedback' ",\n
        "Observation": "'$ReactObservation'",\n
        "ConsoleOutput": ""\n
        },
        {\n
        "Name": "Backend application downloaded", \n
        "Status": "'$BackendStatus'", \n
        "Skill": "Intermediate", \n		
        "Score": "'$BackendScore'% ",\n
        "Feedback": "'$BackendFeedback' ",\n
        "Observation": "'$BackendObservation'",\n
        "ConsoleOutput": ""\n
        },
        {\n
        "Name": "Node Express application started", \n
        "Status": "'$NodeStatus'", \n
        "Skill": "Intermediate", \n		
        "Score": "'$NodeScore'% ",\n
        "Feedback": "'$NodeFeedback' ",\n
        "Observation": "'$NodeObservation'",\n
        "ConsoleOutput": ""\n
        },
        {\n
        "Name": "MongoDB Atlas connection successful", \n
        "Status": "'$DBStatus'", \n
        "Skill": "Advanced", \n		
        "Score": "'$DBScore'% ",\n
        "Feedback": "'$DBFeedback' ",\n
        "Observation": "'$DBObservation'",\n
        "ConsoleOutput": ""\n
        },
        {\n
        "Name": "Application accessible via S3 endpoint", \n
        "Status": "'$AccessStatus'", \n
        "Skill": "Advanced", \n		
        "Score": "'$AccessScore'% ",\n
        "Feedback": "'$AccessFeedback' ",\n
        "Observation": "'$AccessObservation'",\n
        "ConsoleOutput": ""\n
       }],\n

        "TotalScore":"'$Total'%"\n
}\n
                @responseend@'
        echo -e $Result