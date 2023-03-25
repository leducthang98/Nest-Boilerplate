FROM node:16 as builder
WORKDIR /home/node/app
COPY ./package.json ./
RUN chown -R node:node /home/node/app
RUN yarn install
COPY . .
RUN yarn build
RUN rm -r node_modules
RUN yarn install 

FROM node:16-alpine as production
WORKDIR /home/node/app
COPY --from=builder /home/node/app ./
EXPOSE 3000
CMD ["node", "dist/main.js"]