const fs = require('fs-extra');
const path = require('path');


function static(url, pathname, content) {
  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/(\/)?$/, '') + '.html';
  const dist = path.resolve(__dirname, '../../static_pages', './'+relativePath);
  const documentType = `<!DOCTYPE html>
  `;
  console.log('正在创建', dist);
  return fs.outputFile(dist, documentType + content)
  // return new Promise((resolve, reject) => {
  //   fs.outputFile(file, 'hello!', err => {
  //     console.log(err) // => null
    
  //     fs.readFile(file, 'utf8', (err, data) => {
  //       if (err) return console.error(err)
  //       console.log(data) // => hello!
  //     })
  //   })

  //   fs.writeFile(dist, documentType + content, 'utf-8', function (err, data) {
  //     if (err) return reject(err);
  //     resolve(data);
  //   });
  // });
}

module.exports = static;