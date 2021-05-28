#!/bin/sh

PATH=$PATH:`ls -td /opt/elasticbeanstalk/node-install/node-* | head -1`/bin
npm install