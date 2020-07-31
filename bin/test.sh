#!/bin/bash

set -e

ganache-cli --gasLimit 99999999999 2> /dev/null 1> /dev/null &
sleep 5 # to make sure ganache-cli is up and running before compiling
rm -rf build
cp secrets.sample.json secrets.json
truffle compile
truffle migrate --reset --network development
truffle test
rm secrets.json
kill -9 $(lsof -t -i:8545)
