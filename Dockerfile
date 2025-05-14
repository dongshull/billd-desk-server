# 使用官方 Node.js 18 Alpine 镜像作为基础镜像
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装生产依赖和开发依赖（因为构建步骤可能需要）
# 如果构建不需要开发依赖，可以考虑只安装生产依赖 pnpm install --prod --frozen-lockfile
RUN pnpm install --frozen-lockfile

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

# 安装 pnpm
RUN npm install -g pnpm

# 只安装生产依赖
RUN pnpm install --prod --frozen-lockfile

# 设置环境变量 (可以根据实际情况调整或在运行时覆盖)
ENV NODE_ENV=production
ENV NODE_APP_RELEASE_PROJECT_NAME=billd-desk-server
ENV NODE_APP_RELEASE_PROJECT_ENV=prod
ENV NODE_APP_RELEASE_PROJECT_PORT=5200

# 暴露应用程序端口
EXPOSE 5200

# 启动应用程序的命令
CMD ["node", "dist/index.js"]
