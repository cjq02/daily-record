FROM nginx
## 拷贝本地nginx配置文件到容器指定目录 ##
COPY ./conf /etc/nginx/conf.d
## 拷贝SSL证书 ##
COPY ./ssl /etc/nginx

#CMD ["nginx", "-g", "daemon off;"]