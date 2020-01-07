FROM ubuntu

USER root
# 更改镜像源
RUN rm -rf /etc/apt/sources.list
COPY sources.list /etc/apt/sources.list
# 更新 & continue yes
RUN apt-get update --fix-missing && \
  apt-get -y install curl \
  # 下载
  aria2 \
  # xz解压
  xz-utils && \
  # 下载node
  cd /home && \
  aria2c https://npm.taobao.org/mirrors/node/v12.13.0/node-v12.13.0-linux-x64.tar.xz && \
  xz -d node-v12.13.0-linux-x64.tar.xz && \
  tar -xvf node-v12.13.0-linux-x64.tar && \
  # 更名为nodejs
  mv node-v12.13.0-linux-x64  nodejs && \
  # 软链接
  ln -s /home/nodejs/bin/npm /usr/local/bin/ && \
  ln -s /home/nodejs/bin/node /usr/local/bin/ && \
  node -v