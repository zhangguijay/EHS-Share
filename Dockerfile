# EHS Management Platform - Dockerfile
# Multi-stage build for optimized production image

FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# 增加以下两行，确保容器内服务正确绑定在 5000 端口
ENV HOSTNAME="0.0.0.0"
ENV PORT=5000

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built files
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

# Copy .next standalone build (现在 next.config.ts 修改后就不会报错了)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Expose port
EXPOSE 5000

# Switch to non-root user
USER nextjs

# Start the server
CMD ["node", "server.js"]
