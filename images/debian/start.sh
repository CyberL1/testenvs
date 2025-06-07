#!/bin/sh

echo 'root:env' | chpasswd
sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
service ssh start

# Required to keep the server running
tail -f /dev/null
