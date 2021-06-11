FROM node:latest

ENV NODE_ENV="development"

# 作業ディレクトリ作成&設定
WORKDIR /src

COPY ./app /src

RUN npm install
CMD ["npm","run","start"]