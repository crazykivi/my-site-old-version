FROM nginx:alpine

RUN apk update && apk add --no-cache \
    nodejs \
    npm \
    bash \
    sqlite

COPY ./ /usr/share/nginx/html

WORKDIR /usr/share/nginx/html
RUN npm install express sqlite3

EXPOSE 80 3000

COPY ./nginx.conf /etc/nginx/nginx.conf

CMD ["sh", "-c", "node /usr/share/nginx/html/server.js & nginx -g 'daemon off;'"]
