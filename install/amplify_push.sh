#!/bin/bash
set -e
IFS='|' 
CODEGEN="{\
\"generateCode\":true,\
\"codeLanguage\":\"javascript\",\
\"fileNamePattern\":\"src/graphql/**/*.graphql\",\
\"generateDocs\":true,\
\"maxDepth\":2\
}"
amplify push \
--codegen $CODEGEN \
--yes
