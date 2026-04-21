# Demo 网页

由 Cursor Cloud Agent 自动生成的单文件演示网页，纯 HTML/CSS/JS，无任何外部依赖。

## 本地预览

任选其一：

```bash
# Python 3
python3 -m http.server 8000 --directory demo

# Node (需要全局已装 serve 或 http-server)
npx --yes http-server demo -p 8000
```

然后浏览器访问 <http://localhost:8000> 即可。

## 文件说明

- `index.html`：包含全部样式与脚本的单文件页面。
