#!/bin/bash

## 创建nginx镜像 ##
#docker pull nginx

## 复制配置文件夹到指定目录 ##
cp -Ri /root/docker/nginx/ssl /root/project/daily-record/dr-resource/nginx/ssl

## 生成Dockerfile镜像 ##
docker build -t cjq-nginx-image .

## 运行前先移除容器（如果存在）
docker rm cjq_nginx

#运行nginx容器
docker run -it -p 443:443 --name cjq_nginx cjq-nginx-image /bin/bash
#docker run -it -v /root/docker/nginx/conf:/etc/nginx/conf.d -v /root/docker/nginx/ssl:/etc/nginx -p 80:443  --name cjq_nginx nginx /bin/bash