export const calculateReadingTime = (htmlContent: string) => {
  const text = htmlContent.replace(/<[^>]+>/g, ""); // 去除 HTML 标签
  const length = text.length; // 计算字符长度
  const minutes = Math.ceil(length / 350); // 每分钟阅读 350 个字符
  return minutes;
};
