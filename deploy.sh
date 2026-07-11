#!/bin/bash
set -e

echo "Building site..."
pnpm build

echo "Deploying to pages branch..."
cd dist
git init -b pages
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git push -f git@github.com:JerryBlack28/JerryBlack28.github.io.git pages:pages
cd ..
rm -rf dist/.git

echo "Done! Site will be live at https://jerryblack28.github.io in a few minutes."
