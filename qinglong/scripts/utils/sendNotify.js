/**
 * 通用通知模块（精简版）
 *
 * 支持的渠道（按需在青龙环境变量中配置）：
 *   - PUSH_KEY        Server 酱 Turbo
 *   - BARK_PUSH       Bark
 *   - TG_BOT_TOKEN    Telegram Bot Token
 *   - TG_USER_ID      Telegram 接收用户 ID
 *   - DD_BOT_TOKEN    钉钉机器人 token
 *   - QYWX_KEY        企业微信群机器人 key
 *
 * 用法：
 *   const { sendNotify } = require('./utils/sendNotify');
 *   await sendNotify('标题', '正文');
 */

const https = require('https');
const { URL } = require('url');

function postJSON(url, data, extraHeaders = {}) {
  return new Promise((resolve) => {
    const u = new URL(url);
    const body = typeof data === 'string' ? data : JSON.stringify(data);
    const req = https.request(
      {
        method: 'POST',
        hostname: u.hostname,
        path: u.pathname + u.search,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          ...extraHeaders,
        },
      },
      (res) => {
        let chunks = '';
        res.on('data', (c) => (chunks += c));
        res.on('end', () => resolve(chunks));
      },
    );
    req.on('error', () => resolve(''));
    req.write(body);
    req.end();
  });
}

async function serverChan(title, content) {
  const key = process.env.PUSH_KEY;
  if (!key) return;
  await postJSON(`https://sctapi.ftqq.com/${key}.send`, { title, desp: content });
}

async function bark(title, content) {
  const url = process.env.BARK_PUSH;
  if (!url) return;
  await postJSON(`${url.replace(/\/$/, '')}/${encodeURIComponent(title)}/${encodeURIComponent(content)}`, {});
}

async function telegram(title, content) {
  const token = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_USER_ID;
  if (!token || !chatId) return;
  await postJSON(`https://api.telegram.org/bot${token}/sendMessage`, {
    chat_id: chatId,
    text: `${title}\n${content}`,
    disable_web_page_preview: true,
  });
}

async function dingTalk(title, content) {
  const token = process.env.DD_BOT_TOKEN;
  if (!token) return;
  await postJSON(`https://oapi.dingtalk.com/robot/send?access_token=${token}`, {
    msgtype: 'text',
    text: { content: `${title}\n${content}` },
  });
}

async function workWechat(title, content) {
  const key = process.env.QYWX_KEY;
  if (!key) return;
  await postJSON(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${key}`, {
    msgtype: 'text',
    text: { content: `${title}\n${content}` },
  });
}

async function sendNotify(title, content) {
  if (!title || !content) return;
  await Promise.all([
    serverChan(title, content),
    bark(title, content),
    telegram(title, content),
    dingTalk(title, content),
    workWechat(title, content),
  ]);
}

module.exports = { sendNotify };
