FROM node:20
USER node
WORKDIR /usr/src/app
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install pm2 -g

# Bundle app source
COPY . .

EXPOSE 3001

CMD ["pm2-runtime", "process.yml"]
