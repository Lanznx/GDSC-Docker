#!/bin/bash

# 遍歷當前目錄下的所有子目錄，排除 .github 和 .git
for d in */; do
    if [[ $d != ".github/" && $d != ".git/" ]]; then
        cd $d
        docker compose up -d
        npm install
        npm run test
        docker compose down
        cd ..
    fi
done
