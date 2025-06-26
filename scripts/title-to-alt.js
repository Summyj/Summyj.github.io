/* global hexo */

'use strict';

// 将图片的 title 属性转换为 alt 属性，以便图片标题插件能够显示
hexo.extend.filter.register('after_post_render', function(data) {
  // 正则表达式匹配 img 标签
  data.content = data.content.replace(/<img([^>]*?)>/gi, function(match, attrs) {
    // 检查是否已有 alt 属性
    const hasAlt = /\salt\s*=\s*["'][^"']*["']/i.test(attrs);
    
    // 如果没有 alt 属性，尝试从 title 属性获取
    if (!hasAlt) {
      const titleMatch = attrs.match(/\stitle\s*=\s*["']([^"']*)["']/i);
      if (titleMatch && titleMatch[1]) {
        // 在 img 标签中添加 alt 属性
        const altAttr = ` alt="${titleMatch[1]}"`;
        return `<img${attrs}${altAttr}>`;
      }
    }
    
    return match;
  });
  
  return data;
}, 1); // 优先级设置为1，确保在其他插件之前执行 