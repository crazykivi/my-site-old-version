# Этот проект представляет собой статический сайт, который автоматически собирается и развертывается с использованием Docker и GitHub Actions. 
Каждый раз, когда изменения вносятся в репозиторий, через CI/CD процесс происходит пересборка Docker контейнера с последними файлами и автоматический деплой на сервер.

# Этот проект представляет собой статический сайт, который автоматически собирается и развертывается с использованием Docker и GitHub Actions. 
Каждый раз, когда изменения вносятся в репозиторий, через CI/CD процесс происходит пересборка Docker контейнера с последними файлами и автоматический деплой на сервер.

## 1. Подготовка окружения

Прежде чем приступить к работе, необходимо выполнить несколько базовых шагов:

**1.1 Установите Docker**

Установите Docker на вашей виртуальной или выделенной машине. Убедитесь, что служба Docker работает корректно, с помощью команды: __docker --version__

**1.2 Настройте SSH-доступ**

  * 1.2.1 Создайте пользователя для деплоя на вашем сервере
```ssh
sudo adduser ssh_user_name
```
Также установите пароль для этого пользователя.

  * 1.2.2 Дайте ему права на выполнение Docker-команд, добавив в группу
```ssh
sudo usermod -aG docker ssh_user_name
```
  * 1.2.3 Проверьте, что пользователь может подключаться к серверу по SSH
```ssh
ssh ssh_user_name@your_server_ip
```

Для GitHub Actions можно использовать ключи SSH через secrets (SERVER_SSH_PRIVATE_KEY)

**1.3 Зарегистрируйтесь на GitHub**

  * Создайте учетную запись на [[https://github.com/|GitHub]] (если у вас ее еще нет).

**1.4 Зарегистрируйтесь на DockerHub и сгенерируйте токен доступа**
  * 1.4.1 Создайте учетную запись на [[https://hub.docker.com/|DockerHub]] (если у вас ее еще нет).
  * 1.4.2 В настройках учетной записи [[https://hub.docker.com/settings/security|Security]] создайте новый токен доступа (Access Token). Сохраните его, так как он потребуется в GitHub Actions.
## 2. Настройка локального проекта 

**2.1 Настройка локального проекта**

  * 2.1.1 Добавьте файл **Dockerfile** в корень вашего проекта с содержимым:
```nginx 
FROM nginx:alpine
COPY ./ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

  * 2.1.2 Создайте Nginx.conf с конфигурацией:
```nginx
server {
    listen 80;

    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html;
    }
}
```
  * Данный конфигурационный файл используется исключительно для контейнера Docker, а не для основного сервера.
**2.2 Создайте GitHub-репозиторий**
  * 2.2.1 Создайте новый репозиторий для вашего проекта. Убедитесь, что репозиторий является публичным или приватным, в зависимости от ваших нужд.
  * 2.2.2 Установите Git на ваш компьютер [[https://git-scm.com/downloads|Ссылка на гит CMD]]
  * 2.2.3 Откройте терминал (CMD или GitCMD на Windows, любой другой терминал на Linux)
  * 2.2.4 Перейдите в папку с вашим проекта (представлен пример)
cd C:\xampp\htdocs\site
  * 2.2.5 После этого инициализируйте Git в вашем локальном проекте
```init
git init
```
  * 2.2.6 Добавьте файлы проекта в репозиторий (у вас уже должен быть заготовлен сайт)
```add
git add .
```
```commit
git commit -m "Initial commit"
```
```branch
git branch -M main
```
  * 2.2.7 Свяжите ваш локальный репозиторий с удаленным
```remote
git remote add origin https://github.com/yourusername/yourrepository.git
```
```push
git push -u origin main
```
## 3. Настройка GitHub Actions для автоматического деплоя
  * 3.1 В корне репозитория создайте папку .github/workflows и файл deploy.yml. Добавьте в него следующий код:
```action config
name: Build and Deploy Docker Image

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Check out repository
      uses: actions/checkout@v3

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2

    - name: Build Docker image
      run: |
        docker build -t listprojects .

    - name: Log in to DockerHub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Tag Docker image
      run: |
        docker tag listprojects ${{ secrets.DOCKER_USERNAME }}/listprojects:latest

    - name: Push Docker image to DockerHub
      run: |
        docker push ${{ secrets.DOCKER_USERNAME }}/listprojects:latest

    - name: SSH to server and update Docker container
      uses: appleboy/ssh-action@v0.1.6
      with:
        host: ${{ secrets.SERVER_IP }}
        username: ${{ secrets.SERVER_USER }}
        password: ${{ secrets.SERVER_PASSWORD }}
        script: |
          docker pull ${{ secrets.DOCKER_USERNAME }}/listprojects:latest

          docker stop my-site-container || true
          docker rm my-site-container || true

          docker run -d -p 80:80 --name my-site-container \
            -v /home/sshuser/sitegit/nginx.conf:/etc/nginx/nginx.conf \
            -v /home/sshuser/sitegit:/usr/share/nginx/html \
            ${{ secrets.DOCKER_USERNAME }}/listprojects:latest

          docker exec my-site-container nginx -s reload
```
  * В шаге docker exec my-site-container nginx -s reload действие необязательно, так как CMD ["nginx", "-g", "daemon off;"] в Dockerfile уже выполняет запуск сервера.
  * 3.2 Перейдите в настройки вашего репозитория на GitHub (Settings -> Secrets and variables -> Actions -> New repository secret) и добавьте следующие секреты:
```github secret
DOCKER_USERNAME — ваш логин DockerHub
DOCKER_PASSWORD — ваш пароль DockerHub
SERVER_IP — IP-адрес вашего сервера
SERVER_USER — SSH-пользователь на сервере
SERVER_PASSWORD — пароль SSH-пользователя
```
==== Теперь ваш сайт будет автоматически собираться и деплоиться на сервер при каждом пуше в ветку main. ====

**4. Как выполнить автоматический деплой проекта**

  * 4.1 Внесите изменения в файлы вашего проекта. Например, обновите index.html или другие файлы.
  * 4.2 Зафиксируйте изменения и отправьте их в удаленный репозиторий
```add
git add .
```
```commit
git commit -m "Обновление проекта"
```
```push
git push origin main
```
  * 4.3 GitHub Actions начнет работу автоматически
После выполнения команды git push, в вашем репозитории на GitHub начнет выполняться workflow Build and Deploy Docker Image.

Перейдите в раздел Actions вашего репозитория на GitHub, чтобы отслеживать процесс выполнения задач.

**5. Если куплен домен**

  * 5.1 У меня реализован Nginx на основной машине, который работает, как обратный прокси, который перенаправляет запросы на контейнер docker. Поэтому у вас должен быть установлен Nginx и на самой виртуальной машине. Если Nginx не установлен
```linux apt update
sudo apt update
```
```install nginx
sudo apt install nginx -y
```
  * Проверьте наличие Nginx и его версию:
```version nginx
nginx -v
```
  * 5.2 Получите сертификат для https запросов (перед запуском Certbot домен должен быть привязан к IP-адресу сервера):
```linux apt update
sudo apt update
```
```install certbot and python3 certbot for nginx
sudo apt install certbot python3-certbot-nginx -y
```
  * 5.3 Запустите Certbot для автоматической настройки Nginx и получения сертификатов
    1) Введите адрес электронной почты для восстановления сертификатов, если возникнут проблемы.

    2) Согласитесь с условиями обслуживания Let's Encrypt.

    3) Выберите домены. Если ваш Nginx настроен правильно, Certbot покажет список доменов из конфигурации. Выберите нужный (например, nikitaredko.ru)
  * 5.4 Сертификаты Let's Encrypt действуют 90 дней, но их можно автоматически обновлять с помощью Cron
    * 5.4.1 Проверьте обновление сертификатов вручную
```certbot
sudo certbot renew --dry-run
```
* 5.4.2 Если все прошло успешно, добавьте задачу в Cron
    
```new cron
sudo crontab -e
```

* 5.4.3 Вставьте строку для автоматического обновления сертификатов каждые 12 часов

```new corn 12hours
0 */12 * * * certbot renew --quiet
```
Let's Encrypt автоматически добавляет редирект HTTP → HTTPS при использовании Certbot.
  * 5.5 Отредактируйте файл конфигурации (стандартный конфиг находится в /etc/nginx/nginx.conf) и обновите конфигурацию, чтобы она соответствовала следующей структуре:
```nginx conf
events {
    worker_connections 1024;
}

http {
    server {
        listen 443 ssl;
        server_name you_domain.your_domain_zone www.your_domain_zone.ru;

        ssl_certificate /etc/letsencrypt/live/you_domain.your_domain_zone/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/you_domain.your_domain_zone/privkey.pem;
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

        include /etc/letsencrypt/options-ssl-nginx.conf;

        location / {
            proxy_pass http://localhost:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

    server {
        listen 80;
        server_name you_domain.your_domain_zone www.your_domain_zone.ru;

        return 301 https://$host$request_uri;
    }
}
```
  * 5.6 Выполните команду, чтобы убедиться, что синтаксис корректен
```nginx -t
sudo nginx -t
```
  * 5.7 Перезагрузите Nginx
```reload nginx
sudo systemctl reload nginx
```
## При необходимости деплоя других проектов нужно создать уникальные имена для контейнеров (my-site-container) и привязок к портам (8080, 80).

16.12.2024. Дата написания гайда 16.12.2024. Я всё ещё болею и мог что-то пропустить. Если вы заметили ошибки или неточности, можете сообщить мне их на мою личную почту: nik.ita-redko@yandex.ru