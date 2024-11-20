# Официальный Nginx образ
FROM nginx:alpine

COPY ./ /usr/share/nginx/html

EXPOSE 80

COPY ./nginx.conf /etc/nginx/nginx.conf

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
