export const calculateReadingTime = (htmlContent: string) => {
  const text = htmlContent.replace(/<[^>]+>/g, ""); // 去除 HTML 标签
  const words = text.split(/\s+/).filter(Boolean).length; // 计算单词数
  const minutes = Math.ceil(words / 50); // 每分钟阅读 200 个单词
  return minutes;
};
