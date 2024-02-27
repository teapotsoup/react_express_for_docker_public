# Dockerfile

# Node.js  이미지를  기반으로 새로운  이미지를  만들고, 이 단계를 참조할  수 있는 별칭을 지정합니다.
FROM node as builder

# 작업 디렉토리를 /app으로 설정합니다.  이후의  명령어는  이 디렉토리에서 실행됩니다.
WORKDIR /app

# .npmrc 파일을  현재 디렉토리(/app)로 복사합니다. 이 파일은 npm 설정을 포함할  수 있습니다.
COPY .npmrc .

# package.json 파일을  현재 디렉토리(/app)로 복사합니다. 이 파일은 프로젝트의  의존성을  정의합니다.
COPY package.json ./

# package.json에  정의된  의존성을 설치합니다.
RUN npm install

#  모든 파일과 디렉토리를  현재 디렉토리(/app)로 복사합니다.  이는 애플리케이션의  소스 코드를  이미지에 포함시킵니다.
COPY . .

# 애플리케이션을 빌드합니다.  이  명령어는 package.json에  정의된 build  스크립트를 실행합니다.
RUN npm run build

# Nginx 웹  서버를  기반으로 새로운  이미지를  만듭니다.
FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf

# 첫 번째  단계에서 빌드된 결과물(/app/dist)을 Nginx의 웹 루트 디렉토리(/usr/share/nginx/html)로 복사합니다.  이를 통해 웹  서버가 애플리케이션을  서비스할  수 있게 됩니다.
COPY --from=builder /app/dist /usr/share/nginx/html

