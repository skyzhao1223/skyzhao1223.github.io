# 编写规范

## 1. 文件命名

| 类型 | 命名约定 | 示例 |
| --- | --- | --- |
| 京东类脚本 | `jd_<功能>.js` | `jd_sign.js` |
| WSKey 转换 | `wskey_<功能>.js` | `wskey_to_ck.js` |
| 通用工具 | `utils_<功能>.{js,py}` 或放入 `scripts/utils/` | `sendNotify.js` |
| Python 脚本 | 蛇形命名 | `check_cookies.py` |
| Shell 脚本 | `<功能>.sh` | `backup.sh` |

## 2. 头部注释（必填）

每个脚本顶部都需要包含「描述、cron、new Env」三项，青龙才能自动识别并创建定时任务：

```javascript
/**
 * 京东每日签到
 *
 * cron: 30 6,12 * * *
 * new Env('京东每日签到');
 */
```

```python
"""京东每日签到

cron: 30 6,12 * * *
new Env('京东每日签到');
"""
```

## 3. 环境变量

- 优先复用现有变量（如 `JD_COOKIE`、`PUSH_KEY`）
- 自定义变量统一使用 `大写下划线` 形式，并在 README 表格中登记
- 在脚本内进行存在性判断与友好提示，避免 `undefined` 直接抛错

## 4. 通知与日志

- 业务输出走 `console.log` / `print`
- 推送通知统一调用 `scripts/utils/sendNotify.js`
- 不要在日志中明文输出 `pt_key` 等敏感字段，请使用 `maskPin` 等工具脱敏

## 5. 依赖管理

- Node 依赖追加到 `dependence/package.txt`
- Python 依赖追加到 `dependence/requirements.txt`
- 系统级依赖追加到 `dependence/linux.txt`

## 6. 提交规范

建议使用 Conventional Commits：

| 前缀 | 用途 |
| --- | --- |
| `feat` | 新增脚本或功能 |
| `fix` | 修复脚本 Bug |
| `chore` | 依赖或配置变更 |
| `docs` | 仅修改文档 |
| `refactor` | 重构（无功能变化） |
