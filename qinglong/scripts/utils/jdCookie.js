/**
 * 京东 Cookie 读取与校验工具
 *
 * 从青龙环境变量 JD_COOKIE 中读取多账号 Cookie，并执行最基本的格式校验。
 * 其它脚本通过 require('./utils/jdCookie') 引入即可。
 */

function requireCookies() {
  const raw = process.env.JD_COOKIE || '';
  if (!raw.trim()) return [];

  return raw
    .split(/[&\n]/)
    .map((c) => c.trim())
    .filter((c) => /pt_key=/i.test(c) && /pt_pin=/i.test(c));
}

function maskPin(cookie) {
  const m = cookie.match(/pt_pin=([^;]+)/);
  if (!m) return '未知账号';
  const pin = decodeURIComponent(m[1]);
  if (pin.length <= 2) return pin;
  return `${pin.slice(0, 1)}***${pin.slice(-1)}`;
}

module.exports = { requireCookies, maskPin };
