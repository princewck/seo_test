const fs = require('fs');
const path = require('path');


function static(url, pathname, content) {
  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/(\/)?$/, '') + '.html';
  const dist = path.resolve(__dirname, '../../static_pages', relativePath);
  const documentType = `<!DOCTYPE html>
  `;
  console.log(dist);
  return new Promise((resolve, reject) => {
    fs.writeFile(dist, documentType + content, 'utf-8', function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

module.exports = static;