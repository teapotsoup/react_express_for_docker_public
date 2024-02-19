# 리액트 단 작업
FROM node as builder

# 이미지 작업 디렉토리를 지정하는 명령어
WORKDIR /app

# 리액트의 패키지 제이슨을 이미지 루트 폴더에 복사
# 뒷부분 . 은 WORKDIR에서 잡은 경로를 의미.
COPY .npmrc .
COPY package.json .

# 리액트의 npm install
RUN npm install

# 프로젝트 루트 폴더를 이미지 루트 폴더에 전체 복사
COPY . .

# 리액트 빌드
RUN npm run build

# express.js 서버 작업
FROM node

# 이미지 작업 디렉토리를 지정하는 명령어
WORKDIR /app/server

# 원래 서버 폴더의 패키지 제이슨을 이미지 루트 폴더(위에서 지정한)에 복사
COPY ./server/package.json .

RUN npm install

COPY --from=builder /app /app

COPY ./server .

EXPOSE 3001
CMD ["npm", "start"]
