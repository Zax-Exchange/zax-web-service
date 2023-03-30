FROM node:16.19-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./

# download dependencies
RUN npm ci && npm cache clean --force

# copy source code to /app/src folder
COPY app ./app
COPY scripts ./scripts
COPY codegen.yml ./codegen.yml

# build image
RUN npm install
RUN npm run codegen
RUN npm run build

EXPOSE 4000

CMD [ "node", "--experimental-specifier-resolution=node", "dist/app/index.js" ]