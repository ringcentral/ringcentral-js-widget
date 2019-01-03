#!/usr/bin/env bash

rm -rf ./build
yarn build-storybook

cd ./build

git init
git add .
git commit -m "released at $(date)"
git remote add origin https://github.com/MicleMing/ringcentral-js-widgets.git
git push -f origin master:gh-pages