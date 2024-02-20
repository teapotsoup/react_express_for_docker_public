# Dockerfile

# 리액트 애플리케이션 빌드를 위한 Node.js 이미지를 빌드 단계로 사용합니다.
FROM node as builder

# 이미지 작업 디렉토리를 설정합니다.
WORKDIR /app

# 리액트의 패키지 제이슨을 이미지 루트 폴더에 복사합니다.
COPY .npmrc .

# 리액트의 패키지 제이슨과 잠금 파일을 이미지 루트 폴더에 복사합니다.
COPY package.json yarn.lock ./

# npm 또는 yarn을 사용하여 종속성을 설치합니다.
RUN yarn install

# 소스 코드를 이미지에 복사합니다.
COPY . .

# 리액트 애플리케이션을 빌드합니다.
RUN npm run build

# Express.js 서버 빌드를 위한 Node.js 이미지를 두 번째 단계로 사용합니다.
FROM node

# 이미지 작업 디렉토리를 설정합니다.
WORKDIR /app/server

# 서버 폴더의 패키지 제이슨을 이미지 작업 디렉토리로 복사합니다.
COPY ./server/package.json .

# 서버 폴더에서 npm을 사용하여 종속성을 설치합니다.
RUN npm install

# 빌더 단계에서 생성된 리액트 애플리케이션 빌드를 가져옵니다.
COPY --from=builder /app /app

# 서버 소스 코드를 이미지에 복사합니다.
COPY ./server .

# Express 서버의 포트를 노출합니다.
EXPOSE 3001

# Express 서버를 실행합니다.
# CMD ["npm", "start"]
CMD ["node", "index.js"]