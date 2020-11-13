echo installing additional resources in the cloud...

endpoint=`jq -r '.api.ludion.output.GraphQLAPIEndpointOutput' ../ludion/amplify/backend/amplify-meta.json`
apikey=`jq -r '.api.ludion.output.GraphQLAPIKeyOutput' ../ludion/amplify/backend/amplify-meta.json`

echo endpoint=$endpoint,apikey=$apikey
TEMPLATEFILE=../install/dynamodbTables.yaml
STACK=`cat .stack_name`
aws  cloudformation create-stack --template-body $TEMPLATEFILE --capabilities CAPABILITY_IAM --capabilities CAPABILITY_NAMED_IAM  --stack-name $STACK --parameters ParameterKey=endpointParameter,ParameterValue=$endpoint  --parameters ParameterKey=apikeyParameter,ParameterValue=$apikey

AccessKeyId=`aws  cloudformation describe-stacks --stack-name $STACK  --query  "Stacks[0].Outputs[?OutputKey=='ludionAdminAccessKeyId'].OutputValue" --output text`
SecretAccessKey=`aws  cloudformation describe-stacks --stack-name $STACK  --query  "Stacks[0].Outputs[?OutputKey=='ludionAdminSecretAccessKey'].OutputValue" --output text`
sed "s|__region__|$region|g;s|__accessKeyId__|$AccessKeyId|g;s|__secretAccessKey__|$SecretAccessKey|g" ../install/service-updater.json.template >  ../API/unix/service-updater.json
cat ../API/unix/service-updater.json

authKey=`jq -r '.auth' ../ludion/amplify/backend/amplify-meta.json | jq 'keys[0]' -r `
GraphQLAPIEndpointOutput=`jq -r '.api.ludion.output.GraphQLAPIEndpointOutput' ../ludion/amplify/backend/amplify-meta.json`
GraphQLAPIKeyOutput=`jq -r '.api.ludion.output.GraphQLAPIKeyOutput' ../ludion/amplify/backend/amplify-meta.json`
IdentityPoolId=`jq -r ".auth.$authKey.output.IdentityPoolId" ../ludion/amplify/backend/amplify-meta.json`
UserPoolId=`jq -r ".auth.$authKey.output.UserPoolId" ../ludion/amplify/backend/amplify-meta.json`
AppClientIDWeb=`jq -r ".auth.$authKey.output.AppClientIDWeb" ../ludion/amplify/backend/amplify-meta.json`
sed "s|__region__|$region|g;s|__GraphQLAPIEndpointOutput__|$GraphQLAPIEndpointOutput|g;s|__GraphQLAPIKeyOutput__|$GraphQLAPIKeyOutput|g;s|__IdentityPoolId__|$IdentityPoolId|g;s|__UserPoolId__|$UserPoolId|g" ../install/aws-exports.js.template >  ../API/unix/aws-exports.js
cat ../API/unix/aws-exports.js

echo compiling Ludion cli

cd ../API/unix
chmod +x  ./xxxService
npm i
export PATH=PATH:$PWD/../API/unix/:$PATH
export LUDION_CMD_DIR=$PWD
