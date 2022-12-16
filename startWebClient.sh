#!/bin/bash

WORKSPACE=$(
    cd $(dirname $0)
    pwd
)

cd $WORKSPACE/front-end
yarn start
