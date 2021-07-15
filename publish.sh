#/bin/bash

# npm 发布
# sudo ./publish.sh

yarn build && yarn release

cd dist && npm publish

rm -rf ../dist
