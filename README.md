# skyzhao1223.github.io

Sky Zhao 的个人主页（中英双语）。

## 开发

```bash
npm install
npm run dev
```

本地内容源在 `content/`（gitignore），构建时会生成 `public/data.json`。

页面 HTML 模板为 `index.template.html`，开发/构建前会自动复制为 `index.html`。

## 构建

```bash
npm run build
```

构建流程：

1. `scripts/use-template.js` — 从 `index.template.html` 生成 `index.html`
2. `scripts/build-content.js` — 将 `content/*.md` 转为 `public/data.json`
3. `scripts/generate-meta.js` — 从 `scripts/site-config.js` 生成 sitemap / robots
4. `scripts/validate-data.js` — 校验 `public/data.json` 结构
5. `vite build` — 打包前端资源到 `dist/`
6. `scripts/postbuild.js` — 注入 hreflang、生成 `dist/en/index.html`

## 部署

项目支持两种 GitHub Pages 发布方式：

1. **GitHub Actions 产物（推荐）**：部署 Vite 打包后的 `dist/`
2. **分支根目录**：`npm run sync:public` 将 `public/` 资源同步到仓库根目录，供 `master` 直出

请在仓库 **Settings → Pages** 中确认 Source 配置。若使用 Actions，选择 **GitHub Actions**；若使用分支直出，选择 `master` 根目录。

站点 URL 统一在 `scripts/site-config.js` 中维护。

## 目录结构

| 路径 | 说明 |
|------|------|
| `index.template.html` | HTML 模板（含 `__SITE_URL__` 占位符） |
| `index.html` | 构建/同步用的页面入口 |
| `src/` | 样式、脚本、i18n |
| `public/` | 静态资源（头像、二维码、data.json 等） |
| `scripts/` | 构建与生成脚本 |
| `content/` | 本地 Markdown 内容源（不提交） |

## 安全说明

- 用户内容通过 `textContent` 渲染，仅 `data-i18n-html` 允许受信任的 HTML 片段
- 外部链接校验协议，拒绝 `javascript:` 等危险 URL
- `pku_courses.html` 已设置 `noindex`，且不会出现在 sitemap 中
