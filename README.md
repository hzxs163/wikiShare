# CFShare

Cloudflare Workers + Vue 3 的私有 PDF 在线阅读系统。系统不需要自建服务器，运行时完全依赖 Cloudflare 资源。

## 功能范围

- 用户账号密码登录。
- 管理员初始化和用户管理。
- 账号禁用与有效期字段。
- 最多 3 级文件夹。
- PDF 上传到私有 R2。
- PDF.js 在线阅读，后端接口支持 HTTP Range。
- 文件夹/文件回收站。
- Cron 定时过期和回收站清理。
- 默认单个 PDF 上传限制为 100MB，可通过 `MAX_UPLOAD_BYTES` 调整。

## 架构

```text
Cloudflare Workers Static Assets：托管 Vue 前端
Cloudflare Workers：运行 API、鉴权、上传、PDF Range 阅读、Cron 任务
Cloudflare R2：私有存储 PDF 原文件
Cloudflare D1：存储用户、会话、文件夹、文件元数据、回收站和审计日志
```

## 本地开发步骤 下面几个步骤都要执行

0. 安装依赖：

```bash
pnpm install
```

1. 应用 D1 本地迁移： 初始化本地sql init

```bash
pnpm run db:migrate:local
```

2. 本地开发时启动 Worker 模拟 Cloudflare 运行环境：

```bash
pnpm run dev:worker
```

3. 打开另一个终端，启动前端：

```bash
pnpm run dev
```

首次访问登录页时，点击“首次部署，初始化管理员”创建第一个管理员账号。

## 部署前配置

在 Cloudflare 创建：

- D1 数据库：`cfshare-db`
- R2 bucket：`cfshare-pdfs`

然后更新 `wrangler.toml` 中的 `database_id`。

也可以直接执行：

```bash
npm run cf:prepare
```

该命令会通过 Wrangler 创建或复用：

- D1 数据库：`cfshare-db`
- R2 bucket：`cfshare-pdfs`

并生成 `wrangler.local.toml`。这个文件包含真实 D1 database id，不提交到 git。

可按需调整 `wrangler.local.toml` 中的变量：

```toml
MAX_UPLOAD_BYTES = "104857600"
TRASH_RETENTION_DAYS = "30"
TRASH_MAX_BYTES = "21474836480"
```

配置 secret：

```bash
npx wrangler secret put SESSION_SECRET --config wrangler.local.toml
```

远程应用迁移：

```bash
pnpm run db:migrate:remote
```

构建并部署：

```bash
pnpm run deploy
```

## 验证

```bash
pnpm run test
pnpm run build
```
