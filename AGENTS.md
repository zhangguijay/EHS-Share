---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022100beba94fcfef13fea903388a26f7595285a4d522f9195e0c83c459101b2292b6f0220431974c6baed1727af09b99db4548379c50f8955067f39310d030845c5a7ae5c
    ReservedCode2: 3045022100b60c29973c140f4f4b5db2538658fcdb0fa431691751aeb68de9af4d1057b9e902206d43fd372e1a171079d917855b78305a5faeca302594c90d84b481c6355d7328
---

# EHS 综合管理平台

## 项目概述

EHS（环境、健康、安全）综合管理平台是一款基于 Web 的企业级管理软件，采用类似简道云/明道云的无代码平台形式，帮助企业实现 EHS 管理的数字化转型。

## 技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4
- **状态管理**: React Context + LocalStorage
- **数据库**: PostgreSQL (Supabase)
- **部署**: Docker / 腾讯云 / 阿里云

## 目录结构

```
├── public/                 # 静态资源
├── scripts/                # 构建与启动脚本
│   ├── build.sh            # 构建脚本
│   ├── dev.sh              # 开发环境启动脚本
│   ├── prepare.sh          # 预处理脚本
│   └── start.sh            # 生产环境启动脚本
├── src/
│   ├── app/                # 页面路由与布局
│   │   ├── (main)/         # 主应用布局组
│   │   │   ├── layout.tsx  # 主布局组件
│   │   │   ├── dashboard/  # 仪表盘
│   │   │   ├── safety/     # 安全管理模块
│   │   │   ├── environment/# 环境管理模块
│   │   │   ├── health/      # 职业健康模块
│   │   │   ├── approval/    # 审批流程模块
│   │   │   ├── statistics/  # 统计分析模块
│   │   │   └── settings/    # 系统设置模块
│   │   ├── login/          # 登录页面
│   │   └── layout.tsx      # 根布局
│   ├── components/ui/      # Shadcn UI 组件库
│   ├── hooks/              # 自定义 Hooks
│   ├── lib/                # 工具库
│   │   ├── utils.ts        # 通用工具函数 (cn)
│   │   └── auth-context.tsx# 认证上下文
│   └── server.ts           # 自定义服务端入口
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖管理
└── tsconfig.json           # TypeScript 配置
```

## 核心功能模块

### 1. 安全管理 (Safety)
- 隐患排查清单
- 隐患登记与整改闭环
- 事故报告与统计分析
- 安全培训记录
- 特种设备管理

### 2. 环境管理 (Environment)
- 危废管理台账
- 排污许可管理
- 环境监测数据
- 环评档案管理

### 3. 职业健康 (Health)
- 职业病台账
- 体检计划管理
- 劳保用品管理

### 4. 审批流程 (Approval)
- 危废转移审批
- 设备年检审批
- 培训计划审批

### 5. 统计分析 (Statistics)
- 数据可视化看板
- 月度趋势分析
- 部门排名对比

## 开发命令

```bash
# 安装依赖
pnpm install

# 开发环境
pnpm dev

# 生产构建
pnpm build

# 生产运行
pnpm start
```

## 演示账号

| 用户名 | 密码 | 角色 |
|--------|------|------|
| admin | admin123 | 系统管理员 |
| ehs_manager | ehs123 | EHS主管 |
| safety_officer | safe123 | 安全员 |

## 云部署指南

### 腾讯云部署

1. **构建 Docker 镜像**
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 5000
CMD ["node", "server.js"]
```

2. **部署到腾讯云容器服务**
- 使用腾讯云容器镜像服务 (TCR)
- 配置云数据库 PostgreSQL
- 配置对象存储 (COS) 用于文件存储

### 阿里云部署

1. **构建 Docker 镜像**
同上

2. **部署到阿里云容器服务 ACK**
- 使用阿里云容器镜像服务 (ACR)
- 配置云数据库 PostgreSQL
- 配置对象存储 (OSS) 用于文件存储

## 环境变量

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# 对象存储
AWS_S3_BUCKET=your-bucket
AWS_S3_REGION=your-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# 应用配置
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 注意事项

1. 所有页面使用 `use client` 指令，确保客户端渲染
2. 认证状态使用 localStorage 存储
3. 移动端适配使用响应式设计
4. 图表使用内置 CSS 实现，无需额外图表库
