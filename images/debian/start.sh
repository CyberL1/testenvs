#!/bin/sh

sudo service ssh start

# Required to keep the container running
tail -f /dev/null
