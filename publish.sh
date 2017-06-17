#!/bin/bash
# Publish site directory to aws s3

flags="--delete"
flags+=" --acl public-read"
excludePattern="publish.sh"

aws s3 sync . s3://nathanorick.com/ $flags --exclude $excludePattern
