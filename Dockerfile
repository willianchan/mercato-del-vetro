# FROM python:3.6-slim
FROM nikolaik/python-nodejs

COPY . /app

WORKDIR /app

# RUN apt-get update && apt-get -y install npm

RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/ubuntu/18.04/prod.list > /etc/apt/sources.list.d/mssql-release.list
RUN apt-get update
RUN ACCEPT_EULA=Y apt-get -y install msodbcsql17
RUN apt-get install unixodbc-dev

RUN npm install --production

RUN mkdir ./static/vendor/
RUN mkdir ./static/vendor/bootstrap
RUN mkdir ./static/vendor/fontawesome-free
RUN mkdir ./static/vendor/jquery
RUN mkdir ./static/vendor/jquery-easing
RUN mkdir ./static/vendor/slick
RUN mkdir ./static/vendor/jquery-ui

RUN mv -v node_modules/bootstrap/dist/* ./static/vendor/bootstrap
RUN mv -v node_modules/@fortawesome/fontawesome-free/* ./static/vendor/fontawesome-free
RUN mv -v node_modules/jquery/dist/* ./static/vendor/jquery
RUN mv -v node_modules/jquery.easing/* ./static/vendor/jquery-easing
RUN mv -v node_modules/slick-carousel/slick/* ./static/vendor/slick
RUN mv -v node_modules/jquery-ui-dist/* ./static/vendor/jquery-ui

RUN pip install -r requirements.txt

CMD ["python", "./app.py"]
