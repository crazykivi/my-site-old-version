FROM nginx:alpine

COPY ./ /usr/share/nginx/html

COPY ./nginxconfig/nginx-main.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]