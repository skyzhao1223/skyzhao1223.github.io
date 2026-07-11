# skyzhao1223.github.io

Sky Zhao 的个人主页（中英双语）。

## 开发

```bash
npm install
npm run dev
```

本地内容源在 `content/`（gitignore），构建时会生成 `public/data.json`。

## 构建

```bash
npm run build
```

构建流程：

1. `scripts/build-content.js` — 将 `content/*.md` 转为 `public/data.json`
2. `scripts/generate-meta.js` — 从 `scripts/site-config.js` 生成 sitemap / robots
3. `vite build` — 打包前端资源到 `dist/`
4. `scripts/postbuild.js` — 注入 hreflang、生成 `dist/en/index.html`

## 部署

生产环境通过 **GitHub Actions** 部署 `dist/` 产物。

请在仓库 **Settings → Pages** 中将 Source 设为 **GitHub Actions**。

站点 URL 统一在 `scripts/site-config.js` 中维护。

## 目录结构

| 路径 | 说明 |
|------|------|
| `index.html` | 页面模板 |
| `src/` | 样式、脚本、i18n |
| `public/` | 静态资源（头像、二维码、data.json 等） |
| `scripts/` | 构建与生成脚本 |
| `content/` | 本地 Markdown 内容源（不提交） |

## 安全说明

- 用户内容通过 `textContent` 渲染，仅 `data-i18n-html` 允许受信任的 HTML 片段
- 外部链接校验协议，拒绝 `javascript:` 等危险 URL
- `pku_courses.html` 已设置 `noindex`，且不会出现在 sitemap 中
