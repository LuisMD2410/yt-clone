FROM node:25
WORKDIR /app
COPY package*.json ./

RUN apt-get update && apt-get install -y ffmpeg && npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]