FROM debian

RUN apt update && \
  apt update && \
  apt install -y sudo git curl openssh-server

COPY start.sh /start.sh
ENTRYPOINT ["/start.sh"]
