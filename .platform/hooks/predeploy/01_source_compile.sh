#!/bin/sh

export PATH=$PATH:`ls -td /opt/elasticbeanstalk/node-install/node-* | head -1`/bin

./node_modules/.bin/tsc -p tsconfig.json