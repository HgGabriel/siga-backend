FROM node:18-alpine

RUN npm install -g live-server

WORKDIR /app

COPY . .

EXPOSE 5500

CMD [ "live-server", "--port=5500", "--host=0.0.0.0", "--no-browser" ]