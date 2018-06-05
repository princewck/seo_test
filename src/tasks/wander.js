const puppeteer = require('puppeteer');
const static = require('../utils/static');
const _ = require('lodash');

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36';

const grabbed = {}; // 已处理url
let queued = []; // url队列

/**
 *
 * @param {string} url 入口url
 */
async function wander(url = 'http://wangchengkai.com', browser) {
  console.log('----start to process ' + url);
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
  let _hrefs = [];
  try {
  await page.goto(url, {waitUntil: 'networkidle2'});
  // const content = await page.content();
  const context = await page.evaluate((() => {
    const links = [...document.getElementsByTagName('a')];
    links.forEach(a => {
      a.setAttribute('href', a.href);
    });
    const hrefs = links.map(link => link.href);
    let _url = location.href;
    _url = _url.replace(location.hash, '');
    _url = _url.replace(location.search, '');
    return {
      html: document.documentElement.outerHTML,
      url: _url,
      fullUrl: location.href,
      hrefs,
      pathname: location.pathname
    };
  }));
  const { content, url:clearUrl, fullUrl, pathname, hrefs } = context;
  _hrefs = hrefs;
  await static(clearUrl, pathname, content);
  } catch(e) {
    console.log('err:', e);
  }
  grabbed[url] = 1;
  queued2 = _.filter(_.uniq([..._hrefs, ...queued]), link => !grabbed[link]);
  console.log(_.difference(queued2, queued), 'added to queue!');
  queued = queued2;
  if (queued.length) {
    wander(queued.shift());
  } else {
    await browser.close();
    console.log('finished');
  }
}


wander();