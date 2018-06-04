const fs = require('fs');
const path = require('path');

function static(url, content) {
  const match = url.match(/\/\/([^\/])+\/([^#?]*)/);
  const _path = match[2] || 'index';
  const dir = path.resolve(__dirname, '../../static_pages', `${_path}.html`);
  return new Promise((resolve, reject) => {
    fs.writeFile(dir, content, 'utf-8', function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

module.exports = static;