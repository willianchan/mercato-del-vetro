FROM python:3.6-slim

COPY . /app

WORKDIR /app

RUN apt-get update && apt-get -y install npm

RUN npm install --production

COPY ./node_modules/bootstrap/dist ./static/vendor/bootstrap
COPY ./node_modules/@fortawesome/fontawesome-free ./static/vendor/fontawesome-free
COPY ./node_modules/jquery/dist ./static/vendor/jquery
COPY ./node_modules/jquery.easing ./static/vendor/jquery-easing
COPY ./node_modules/slick-carousel/slick ./static/vendor/slick
COPY ./node_modules/jquery-ui-dist ./static/vendor/jquery-ui

RUN pip install -r requirements.txt

CMD ["python", "./app.py"]