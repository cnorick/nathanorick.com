#!/bin/bash
# Publish site directory to aws s3

flags="--delete"
flags+=" --acl public-read"

npm run build
aws s3 sync dist/ s3://nathanorick.com/ $flags
