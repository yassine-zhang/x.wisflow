import { ref } from "vue";
import { useChunkedMarkdownParser } from "./useChunkedMarkdownParser";

/**
 * 提供加载和解析全局 Markdown 文件的功能。
 * @returns {Object} 包含 HTML 内容和加载 Markdown 文件的函数。
 */
export function useGlobMarkdownLoader() {
  const htmlContent = ref("");
  const { parseInChunks } = useChunkedMarkdownParser();
  const markdownFiles = import.meta.glob("/src/content/**/*.md", {
    query: "?raw",
    import: "default",
  });

  /**
   * 异步加载并解析指定路径的 Markdown 文件。
   * @param {string} filePath - 要加载的 Markdown 文件的路径，例如：/src/content/base/me.md
   * @param {(value: number) => void} updateProgress - 更新加载进度的回调函数。
   * @returns {Promise<void>} - 无返回值。
   * @throws {Error} - 如果文件未找到或加载失败。
   *
   * 该函数会尝试从指定路径加载 Markdown 文件，并使用解析器将其转换为 HTML。
   * 在解析过程中，会通过 `updateProgress` 回调函数更新加载进度。
   */
  const loadMarkdown = async (
    filePath: string,
    updateProgress: (value: number) => void,
  ): Promise<void> => {
    try {
      const loadFile = markdownFiles[filePath];
      if (!loadFile) {
        throw new Error(`File not found: ${filePath}`);
      }
      const markdown = (await loadFile()) as string;
      htmlContent.value = await parseInChunks(markdown, updateProgress);
    } catch (error) {
      console.error(error);
      htmlContent.value = "<p>Error loading content</p>";
    }
  };

  return { htmlContent, loadMarkdown };
}
