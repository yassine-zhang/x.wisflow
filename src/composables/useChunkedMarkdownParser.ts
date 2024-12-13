import { parseMarkdown } from "@/utils/markdownUtils";
import { marked } from "marked";

export function useChunkedMarkdownParser() {
  const parseInChunks = async (
    markdownContent: string,
    updateProgress: (progress: number) => void,
  ) => {
    // 使用 Marked 的 Lexer 解析
    const tokens = marked.lexer(markdownContent);

    // 转换 Token 为字符串
    const chunks = tokens.map((token) => {
      if (token.type === "paragraph") return token.raw;
      if (token.type === "heading") return `${token.raw}`;
      if (token.type === "code")
        return `\`\`\`${token.lang || ""}\n${token.text}\n\`\`\``;
      return token.raw || "";
    });
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
