#!/bin/bash

WORKSPACE=$(
    cd $(dirname $0)
    pwd
)

cd $WORKSPACE/back-end
yarn install

cd ..
cd $WORKSPACE/front-end
yarn install
