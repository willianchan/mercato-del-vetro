# FROM python:3.6-slim
FROM nikolaik/python-nodejs

COPY . /app

WORKDIR /app

# RUN apt-get update && apt-get -y install npm

RUN npm install --production

RUN mkdir ./static/vendor/
RUN mkdir ./static/vendor/fontawesome-free
RUN mkdir ./static/vendor/jquery
RUN mkdir ./static/vendor/jquery-easing
RUN mkdir ./static/vendor/slick
RUN mkdir ./static/vendor/jquery-ui

RUN cp -r node_modules/bootstrap/dist ./static/vendor/bootstrap
RUN cp -r node_modules/@fortawesome/fontawesome-free ./static/vendor/fontawesome-free
RUN cp -r node_modules/jquery/dist ./static/vendor/jquery
RUN cp -r node_modules/jquery.easing ./static/vendor/jquery-easing
RUN cp -r node_modules/slick-carousel/slick ./static/vendor/slick
RUN cp -r node_modules/jquery-ui-dist ./static/vendor/jquery-ui

RUN pip install -r requirements.txt

CMD ["python", "./app.py"]