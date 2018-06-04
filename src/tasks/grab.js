const request = require('superagent');
const chalk = require('chalk');
require('konsole.table');


const UA_MAP = {
  'default': {name: '用户chrome浏览器', value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'},
  'baidu': {name: '百度蜘蛛', value: 'Mozilla/5.0 (compatible; Baiduspider-render/2.0; +http://www.baidu.com/search/spider.html)'},
  'sousou': {name: '搜搜蜘蛛', value: 'Sosospider+(+http://help.soso.com/webspider.htm)'},
  'google': {name: '谷歌爬虫', value: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'}
};


const ua = UA_MAP[process.argv[2]] || UA_MAP.default;
const url = process.argv[3] || 'http://wangchengkai.com';
console.log('当前使用UA：', ua.name);

async function doRequest(){
	request.get(url)
    .set({ 'User-Agent': ua.value })
    .timeout({ response: 5000, deadline: 60000 })
    .end(async(err, res) => {
      // 处理数据
      console.table([res.req._headers]);
      console.log('\n\n\n\n============抓取到的页面=================\n\n');
      console.log(chalk.yellow(res.text));
      console.log('\n\n\============抓取到的页面end==============\n\n\n');
      // console.log(res.req._headers);
    })
}

doRequest();
