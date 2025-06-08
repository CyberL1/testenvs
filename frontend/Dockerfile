FROM node:alpine

WORKDIR frontend

COPY . .
RUN npm i && \
  npm run build

WORKDIR build
CMD ["node", "index.js"]
