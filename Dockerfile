# 使用官方 Node.js 18 Alpine 镜像作为基础镜像
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装构建依赖和pnpm
# 添加 libc-dev，确保在最前面更新 apk 索引
RUN apk update && apk add --no-cache python3 make g++ curl openssl-dev libc-dev \
    && npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装依赖
# 将命令分开执行以便定位问题
# 增加 --loglevel debug 获取更详细的 pnpm 日志
RUN pnpm install --frozen-lockfile --loglevel debug
RUN pnpm rebuild
# RUN pnpm cache clean # 暂时注释掉以减少变量

# 复制项目其余文件
COPY . .

# 运行构建脚本
RUN pnpm run build

# 第二阶段：创建更小的生产镜像
FROM node:18-alpine

WORKDIR /app

# 从构建器阶段复制构建产物 (dist 目录)
COPY --from=builder /app/dist ./dist

# 复制 package.json 和 pnpm-lock.yaml 以便安装生产依赖
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./

# 安装 pnpm (生产阶段通常不需要完整的构建工具链，除非生产依赖也需要编译)
RUN apk update && apk add --no-cache curl openssl-dev libc-dev \
    && npm install -g pnpm

# 只安装生产依赖
RUN pnpm install --prod --frozen-lockfile --loglevel debug
# RUN pnpm rebuild # 如果生产依赖有原生模块且需要重新编译，则取消注释
# RUN pnpm cache clean # 暂时注释掉

# 设置环境变量 (可以根据实际情况调整或在运行时覆盖)
ENV NODE_ENV=production
ENV NODE_APP_RELEASE_PROJECT_NAME=billd-desk-server
ENV NODE_APP_RELEASE_PROJECT_ENV=prod
ENV NODE_APP_RELEASE_PROJECT_PORT=5200

# 暴露应用程序端口
EXPOSE 5200

# 启动应用程序的命令
CMD ["node", "dist/index.js"]
