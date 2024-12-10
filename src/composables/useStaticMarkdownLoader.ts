import { ref } from "vue";
import { useChunkedMarkdownParser } from "./useChunkedMarkdownParser";

/**
 * 提供解析静态 Markdown 内容的功能。
 * @returns {Object} 包含 HTML 内容和解析 Markdown 内容的函数。
 */
export function useStaticMarkdownLoader() {
  const htmlContent = ref("");
  const { parseInChunks } = useChunkedMarkdownParser();

  /**
   * 解析给定的 Markdown 内容并更新 HTML 内容。
   * @param {string} markdownContent - 要解析的 Markdown 内容。
   * @param {(value: number) => void} updateProgress - 更新加载进度的回调函数。
   * @returns {Promise<void>} - 无返回值。
   *
   * 该函数接收 Markdown 字符串内容，使用解析器将其转换为 HTML。
   * 在解析过程中，会通过 `updateProgress` 回调函数更新加载进度。
   */
  const loadMarkdown = async (
    markdownContent: string,
    updateProgress: (value: number) => void,
  ): Promise<void> => {
    htmlContent.value = await parseInChunks(markdownContent, (value) => {
      updateProgress(value);
    });
  };

  return { htmlContent, loadMarkdown };
}
