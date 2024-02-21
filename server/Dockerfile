# server 디렉토리에  위치한 Dockerfile
FROM node

# 작업 디렉토리를 /app으로 설정
WORKDIR /

# server 디렉토리의 package.json과 package-lock.json을 작업 디렉토리에 복사
COPY ./package*.json ./

# package.json에  지정된 필요한 패키지를 설치
RUN npm install

# server 디렉토리의  소스를 Docker  이미지  내에 번들링
COPY . .

# 앱이 실행되는 포트를 노출
EXPOSE  3001

# 앱을 실행하는  명령을  정의
CMD [ "node", "index.js" ]
