echo installing additional resources in the cloud...
STACK=`cat .stack_name`
STACKNAME=ludion-$STACK

endpoint=`jq -r ".api.ludion$STACK.output.GraphQLAPIEndpointOutput" ../ludion/amplify/backend/amplify-meta.json`
apikey=`jq -r ".api.ludion$STACK.output.GraphQLAPIKeyOutput" ../ludion/amplify/backend/amplify-meta.json`
region=`jq -r ".providers.awscloudformation.Region" ../ludion/amplify/backend/amplify-meta.json`
apiId=`aws appsync list-graphql-apis | jq -r " .graphqlApis |.[] | select( .name==\"ludion$STACK-$STACK\" ).apiId"`
serviceTable=Service-$apiId-$STACK
serviceTableArn=arn:aws:dynamodb:$region:500547172594:table/$serviceTable

echo endpoint=$endpoint; echo apikey=$apikey; echo region=$region; echo STACK=$STACK; echo apiId=$apiId; echo serviceTable=$serviceTable; echo serviceTableArn=$serviceTableArn

TEMPLATEFILE=$PWD/../install/dynamodbTables.yaml

echo ss $STACK $TEMPLATEFILE \"--capabilities CAPABILITY_IAM --capabilities CAPABILITY_NAMED_IAM  --stack-name $STACKNAME --parameters ParameterKey=endpointParameter,ParameterValue=$endpoint  ParameterKey=apikeyParameter,ParameterValue=$apikey ParameterKey=userNameParameter,ParameterValue=ludionAdmin$STACK ParameterKey=serviceTableParameter,ParameterValue=$serviceTableArn\"

echo aws  cloudformation create-stack --template-body file://$TEMPLATEFILE --capabilities CAPABILITY_IAM --capabilities CAPABILITY_NAMED_IAM  --stack-name $STACKNAME --parameters ParameterKey=endpointParameter,ParameterValue=$endpoint  ParameterKey=apikeyParameter,ParameterValue=$apikey ParameterKey=userNameParameter,ParameterValue=ludionAdmin$STACK ParameterKey=serviceTableParameter,ParameterValue=$serviceTableArn

stack_already_created=`aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE | jq -r '.StackSummaries | .[] | select(.StackName=="$STACKNAME").StackStatus'`
stack_already_updated=`aws cloudformation list-stacks --stack-status-filter UPDATE_COMPLETE | jq -r '.StackSummaries | .[] | select(.StackName=="$STACKNAME").StackStatus'`
stack_rollback_complete=`aws cloudformation list-stacks --stack-status-filter ROLLBACK_COMPLETE | jq -r '.StackSummaries | .[] | select(.StackName=="$STACKNAME").StackStatus'`


aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE   | jq -r '.StackSummaries | .[] | .StackName' | grep $STACKNAME > .scan.out
aws cloudformation list-stacks --stack-status-filter UPDATE_COMPLETE   | jq -r '.StackSummaries | .[] | .StackName' | grep $STACKNAME >> .scan.out
aws cloudformation list-stacks --stack-status-filter ROLLBACK_COMPLETE | jq -r '.StackSummaries | .[] | .StackName' | grep $STACKNAME >> .scan.out
cat .scan.out
stack_already_created=`grep $STACKNAME  .scan.out`


if [[ -n $stack_already_created ]]; then
    echo Stack $STACKNAME already exists... updating it
    aws  cloudformation update-stack --template-body file://$TEMPLATEFILE --capabilities CAPABILITY_IAM --capabilities CAPABILITY_NAMED_IAM  --stack-name $STACKNAME --parameters ParameterKey=endpointParameter,ParameterValue=$endpoint  ParameterKey=apikeyParameter,ParameterValue=$apikey ParameterKey=userNameParameter,ParameterValue=ludionAdmin$STACK ParameterKey=serviceTableParameter,ParameterValue=$serviceTableArn
    echo Waiting for completion...
    aws cloudformation wait stack-update-complete --stack-name $STACKNAME --no-paginate --output text
else
    echo creating Stack $STACKNAME...
    aws  cloudformation create-stack --template-body file://$TEMPLATEFILE --capabilities CAPABILITY_IAM --capabilities CAPABILITY_NAMED_IAM  --stack-name $STACKNAME --parameters ParameterKey=endpointParameter,ParameterValue=$endpoint  ParameterKey=apikeyParameter,ParameterValue=$apikey ParameterKey=userNameParameter,ParameterValue=ludionAdmin$STACK ParameterKey=serviceTableParameter,ParameterValue=$serviceTableArn
    echo Waiting for completion...
    aws cloudformation wait stack-create-complete --stack-name $STACKNAME --no-paginate --output text
fi


if [[ -d ../API/unix/node_modules ]]; then
   echo Ludion cli already compiled...
else
    echo compiling Ludion cli

    cd ../API/unix
    chmod +x  ./xxxService
    npm i
    echo ZZZZZ fixing text-table to be able to print null
    mv node_modules/text-table/index.js node_modules/text-table/index.js.orig
    cp ../../install/text-table-fix.js node_modules/text-table/index.js
    export PATH=PATH:$PWD:$PATH
    export LUDION_CMD_DIR=$PWD
    cd -
fi


AccessKeyId=`aws  cloudformation describe-stacks --stack-name $STACKNAME  --query  "Stacks[0].Outputs[?OutputKey=='ludionAdminAccessKeyId'].OutputValue" --output text`
SecretAccessKey=`aws  cloudformation describe-stacks --stack-name $STACKNAME  --query  "Stacks[0].Outputs[?OutputKey=='ludionAdminSecretAccessKey'].OutputValue" --output text`
sed "s|__region__|$region|g;s|__accessKeyId__|$AccessKeyId|g;s|__secretAccessKey__|$SecretAccessKey|g" ../install/service-updater.json.template >  ../API/unix/service-updater.json
cat ../API/unix/service-updater.json

authKey=`jq -r '.auth' ../ludion/amplify/backend/amplify-meta.json | jq 'keys[0]' -r `
GraphQLAPIEndpointOutput=`jq -r ".api.ludion$STACK.output.GraphQLAPIEndpointOutput" ../ludion/amplify/backend/amplify-meta.json`
GraphQLAPIKeyOutput=`jq -r ".api.ludion$STACK.output.GraphQLAPIKeyOutput" ../ludion/amplify/backend/amplify-meta.json`
IdentityPoolId=`jq -r ".auth.$authKey.output.IdentityPoolId" ../ludion/amplify/backend/amplify-meta.json`
UserPoolId=`jq -r ".auth.$authKey.output.UserPoolId" ../ludion/amplify/backend/amplify-meta.json`
AppClientIDWeb=`jq -r ".auth.$authKey.output.AppClientIDWeb" ../ludion/amplify/backend/amplify-meta.json`
serviceDetailTable=`aws  cloudformation list-stack-resources --stack-name $STACKNAME | jq -r '.StackResourceSummaries | .[] | select(.LogicalResourceId == "serviceDetail").PhysicalResourceId'`
sed "s|__region__|$region|g;s|__serviceTable__|$serviceTable|g;s|__serviceDetailTable__|$serviceDetailTable|g;s|__GraphQLAPIEndpointOutput__|$GraphQLAPIEndpointOutput|g;s|__GraphQLAPIKeyOutput__|$GraphQLAPIKeyOutput|g;s|__IdentityPoolId__|$IdentityPoolId|g;s|__UserPoolId__|$UserPoolId|g" ../install/aws-exports.js.template >  ../API/unix/aws-exports.js
cat ../API/unix/aws-exports.js

