# 青龙脚本仓库（QingLong Scripts）

> 本仓库用于集中管理 [青龙面板（QingLong Panel）](https://github.com/whyour/qinglong) 中运行的各类自动化脚本，方便统一拉取、订阅与维护。

## 目录结构

```text
qinglong/
├── scripts/              # 脚本主目录
│   ├── jd/               # 京东相关脚本（签到、薅羊毛、互助等）
│   ├── wskey/            # WSKey 转换 / Cookie 续期脚本
│   └── utils/            # 通用工具脚本（通知、Cookie 校验等）
├── dependence/           # 依赖文件（Node / Python / Shell）
├── sub/                  # 青龙订阅配置示例
├── docs/                 # 使用文档与说明
└── .github/workflows/    # CI（语法检查 / 自动同步等）
```

## 一、在青龙面板中拉取本仓库

> 假设你已将本仓库迁移/Fork 至自己的账号下，仓库地址形如 `https://github.com/<your-name>/qinglong-scripts.git`。

### 方式 A：使用 `ql repo` 命令（推荐）

进入青龙容器后执行：

```bash
ql repo https://github.com/<your-name>/qinglong-scripts.git \
  "jd_|jx_|jddj_" \
  "sign|backUp" \
  "^jd[^_]|USER|utils|function|jdCookie" \
  "main" \
  "qinglong/scripts"
```

参数说明：

| 位置 | 含义 |
| --- | --- |
| `$1` | 仓库地址 |
| `$2` | 拉取脚本的正则白名单 |
| `$3` | 拉取脚本的正则黑名单 |
| `$4` | 拉取依赖文件的正则 |
| `$5` | 分支名 |
| `$6` | 仓库内的脚本路径（本仓库在 `qinglong/scripts` 子目录下） |

### 方式 B：在「订阅管理」中导入

打开 **青龙面板 → 订阅管理 → 新建订阅**，参考 `qinglong/sub/subscribe.example.json` 中的字段填写即可。

## 二、Cookie 配置

在青龙面板 **环境变量** 中按如下方式新增：

| 变量名 | 含义 | 示例 |
| --- | --- | --- |
| `JD_COOKIE` | 京东账号 Cookie，多个账号用 `&` 分隔 | `pt_key=xxx;pt_pin=xxx;` |
| `JD_DEBUG` | 调试日志开关 | `false` |
| `PUSH_KEY` | Server 酱 Turbo 推送 Key | `SCT...` |
| `BARK_PUSH` | Bark 推送地址 | `https://api.day.app/xxx` |

> 推送相关变量可在 `qinglong/scripts/utils/sendNotify.js` 中查阅完整列表。

## 三、定时规则

每个脚本头部均带有「cron 表达式」与「new Env」声明，例如：

```javascript
/**
 * 京东每日签到
 * cron: 30 6,12 * * *
 * new Env('京东每日签到');
 */
```

青龙在拉库后会按头部声明自动添加定时任务，无需手动配置。

## 四、贡献指南

1. Fork 本仓库并创建特性分支：`git checkout -b feat/your-script`
2. 在 `qinglong/scripts/<分类>/` 下添加脚本，文件名遵循 `jd_xxx.js`、`utils_xxx.py` 等规范
3. 在脚本头部写明：`描述`、`cron`、`new Env(...)`、`作者`、`更新日期`
4. 提交 PR 时附上脚本说明、所需环境变量、运行截图（可选）

## 五、免责声明

- 本仓库脚本仅供学习与研究使用，请勿用于商业用途
- 使用脚本造成的账号风控、封禁等后果由使用者自行承担
- 如脚本侵犯了您的权益，请通过 Issue 联系仓库维护者删除

## License

[MIT](./LICENSE)
