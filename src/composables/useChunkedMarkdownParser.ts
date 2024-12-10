import { parseMarkdown } from "@/utils/markdownUtils";

export function useChunkedMarkdownParser() {
  const parseInChunks = async (
    markdownContent: string,
    updateProgress: (progress: number) => void,
  ) => {
    const chunks = markdownContent.split("\n\n"); // 简单的分块方式
    const totalChunks = chunks.length;
    let parsedContent = "";

    for (let i = 0; i < totalChunks; i++) {
      parsedContent += await parseMarkdown(chunks[i]);
      const progress = ((i + 1) / totalChunks) * 100;
      updateProgress(progress); // 使用传入的函数更新进度
    }

    return parsedContent;
  };

  return { parseInChunks };
}
