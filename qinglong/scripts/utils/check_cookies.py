#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""通用 Cookie 校验工具

读取青龙环境变量 JD_COOKIE，按账号分组后输出脱敏后的 pt_pin 与剩余项数量，
便于排查多账号配置是否正确。

cron: 0 8 * * *
new Env('Cookie 校验');
"""

import os
import re
import sys


def parse_cookies(raw: str):
    items = [c.strip() for c in re.split(r"[&\n]+", raw) if c.strip()]
    return [c for c in items if "pt_key=" in c and "pt_pin=" in c]


def mask_pin(cookie: str) -> str:
    m = re.search(r"pt_pin=([^;]+)", cookie)
    if not m:
        return "未知账号"
    pin = m.group(1)
    if len(pin) <= 2:
        return pin
    return f"{pin[0]}***{pin[-1]}"


def main() -> int:
    raw = os.environ.get("JD_COOKIE", "")
    if not raw.strip():
        print("未检测到 JD_COOKIE，请在青龙环境变量中添加。")
        return 1

    cookies = parse_cookies(raw)
    if not cookies:
        print("JD_COOKIE 已配置，但解析后没有有效账号，请检查格式。")
        return 1

    print(f"共检测到 {len(cookies)} 个有效账号：")
    for idx, ck in enumerate(cookies, 1):
        print(f"  [{idx:>2}] pt_pin={mask_pin(ck)}  字段数={len(ck.split(';'))}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
