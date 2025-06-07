FROM nginx:alpine

ENTRYPOINT ["/bin/sh", "-c", "sed \"s/{PROXY_DOMAIN}/$PROXY_DOMAIN/\" etc/nginx/templates/proxy.conf > etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
