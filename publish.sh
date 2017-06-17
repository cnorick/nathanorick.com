#!/bin/bash
# Publish site directory to aws s3

flags="--delete"
flags+=" --acl public-read"

aws s3 sync . s3://nathanorick.com/ $flags --exclude '.git/*' --exclude publish.sh
