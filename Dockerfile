# Dockerfile

# 리액트 애플리케이션 빌드를 위한 Node.js 이미지를 빌드 단계로 사용합니다.
FROM node as builder

# 이미지 작업 디렉토리를 설정합니다.
WORKDIR /app

# 리액트의 패키지 제이슨을 이미지 루트 폴더에 복사합니다.
COPY .npmrc .

# 리액트의 패키지 제이슨과 잠금 파일을 이미지 루트 폴더에 복사합니다.
COPY package.json ./

# npm 또는 yarn을 사용하여 종속성을 설치합니다.
RUN npm install

# React 애플리케이션의   소스를 Docker   이미지   내에 번들링
COPY  . .

# React 애플리케이션을 빌드
RUN npm run build

FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html

