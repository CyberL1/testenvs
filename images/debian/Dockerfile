FROM debian
ENV USER=tester

RUN apt update && \
  apt install -y sudo git curl

RUN adduser $USER --gecos "" && \
  echo "$USER:$USER" | chpasswd && \
  echo "$USER ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/$USER

USER $USER
COPY start.sh /start.sh

WORKDIR /home/$USER
ENTRYPOINT ["/start.sh"]
