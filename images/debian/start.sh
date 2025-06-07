#!/bin/sh

echo 'root:root' | chpasswd
sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
service ssh start

# Required to keep the container running
tail -f /dev/null
