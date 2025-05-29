# 使用官方 Node.js 18 Alpine 鏡像作為基礎鏡像
FROM node:18-alpine AS base

# 安裝依賴階段
FROM base AS deps
# 檢查 https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

RUN npm ci

# 構建階段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 設置環境變量
ENV NEXT_TELEMETRY_DISABLED 1

# 構建應用
RUN npm run build

# 生產階段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# 創建非 root 用戶
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 複製構建產物
COPY --from=builder /app/public ./public

# 設置正確的權限
RUN mkdir .next
RUN chown nextjs:nodejs .next

# 複製構建產物並設置權限
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# 啟動應用
CMD ["node", "server.js"] 