#!/bin/bash
# Publish site directory to aws s3

flags="--delete"
flags+=" --acl public-read"

npm run build

# Doesn't work right now because the app looks for assets at the root directory, not from /dev/.
if [ $1="dev" ]; then
    url="s3://content.nathanorick.com/dev/"
else
    url="s3://nathanorick.com/"
fi

aws s3 sync dist/ $url $flags
