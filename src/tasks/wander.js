const puppeteer = require('puppeteer');
const static = require('../utils/static');

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36';

const grabbed = {}; // 已处理url
const queued = {}; // url队列

/**
 *
 * @param {string} url 入口url
 */
async function wander(url = 'http://wangchengkai.com', browser) {
  try {
    const p = await browser.newPage();
    await p.close();
  } catch (e) {
    browser = await puppeteer.launch({headless: false});
  }
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2
  });
  await page.setUserAgent(UA);
  await page.goto(url, {waitUntil: 'networkidle2'});
  // const content = await page.content();
  const content = '';
  await page.$eval('html', node => {
    content = node.innerHTML;
  }, content);
  console.log(content);
  return;
  // const content = html.innerHTML;
  const currentUrl = await page.url();
  await static(currentUrl, content);
  grabbed[currentUrl] = 1;
}


wander();