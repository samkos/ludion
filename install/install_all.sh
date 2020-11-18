echo ---------- 1. init
bash ../install/amplify_init.sh
echo ---------- 2. add api
../install/amplify_add_api.sh
echo ---------- 3. add auth
../install/amplify_add_auth.sh
echo ---------- 4. push
bash ../install/amplify_push.sh
echo ---------- 5. npm install
npm install
echo ---------- 6. hosting add
../install/amplify_hosting_add.sh
echo ---------- 7. publish
../install/amplify_publish.sh
echo ---------- 8. add cli
bash ../install/ludion_cli_configure
