#/bin/bash

# turn on job control
set -m

mongod &

npm run server

# mongodb process back into the foreground
fg %1
