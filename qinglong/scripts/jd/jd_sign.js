/**
 * 京东每日签到（示例脚本）
 *
 * 功能：调用京东 App 端「签到领京豆」接口，每日为账号签到一次。
 * 仅作为青龙脚本目录结构与编写规范的示例，请在合规、合理的范围内使用。
 *
 * 环境变量：
 *   JD_COOKIE   京东 Cookie，多账号用 & 分隔，必须包含 pt_key 与 pt_pin
 *   JD_DEBUG    是否输出调试日志（true / false），默认 false
 *
 * cron: 30 6,12 * * *
 * new Env('京东每日签到');
 */

const $ = new Env('京东每日签到');
const notify = $.isNode() ? require('../utils/sendNotify') : '';
const { requireCookies } = $.isNode() ? require('../utils/jdCookie') : { requireCookies: () => [] };

const SIGN_API = 'https://api.m.jd.com/client.action?functionId=signBeanIndex';
const UA =
  'jdapp;iPhone;10.0.10;14.3;network/wifi;model/iPhone12,1;appBuild/167707;ADID/;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/30;pap/JA2019_3111789;brand/apple;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/18C66';

!(async () => {
  const cookies = requireCookies();
  if (!cookies.length) {
    console.log('未检测到 JD_COOKIE，请在青龙环境变量中添加。');
    return;
  }

  const messages = [];
  for (let i = 0; i < cookies.length; i++) {
    const ck = cookies[i];
    const account = (ck.match(/pt_pin=([^;]+)/) || [, `账号${i + 1}`])[1];
    try {
      const result = await sign(ck);
      messages.push(`【${decodeURIComponent(account)}】${result}`);
    } catch (e) {
      messages.push(`【${decodeURIComponent(account)}】签到失败：${e.message || e}`);
    }
  }

  console.log('\n' + messages.join('\n'));
  if (notify && notify.sendNotify) {
    await notify.sendNotify($.name, messages.join('\n'));
  }
})()
  .catch((err) => console.log(`运行异常：${err}`))
  .finally(() => $.done());

function sign(cookie) {
  return new Promise((resolve, reject) => {
    const headers = {
      'User-Agent': UA,
      Cookie: cookie,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const body = 'body=%7B%22fp%22%3A%22-1%22%2C%22appid%22%3A%22ld%22%7D';

    fetch(SIGN_API, { method: 'POST', headers, body })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.code === '0' && data.data) {
          const award = data.data.dailyAward || {};
          resolve(`签到成功，获得 ${award.beanAward?.beanCount || 0} 京豆`);
        } else {
          reject(new Error(data && data.msg ? data.msg : JSON.stringify(data)));
        }
      })
      .catch(reject);
  });
}

// ========== Env 工具类（精简版，与青龙官方实现保持兼容） ==========
function Env(name) {
  this.name = name;
  this.startTime = Date.now();
  this.isNode = () => typeof module !== 'undefined' && !!module.exports;
  this.log = (...args) => console.log(...args);
  this.done = () => {
    const cost = ((Date.now() - this.startTime) / 1000).toFixed(2);
    console.log(`\n${this.name}, 耗时 ${cost} 秒`);
  };
}
