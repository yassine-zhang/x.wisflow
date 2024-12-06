import { ref } from "vue";
import { parseMarkdown } from "@/utils/markdownUtils";

export function useGlobMarkdownLoader() {
  const htmlContent = ref("");
  const markdownFiles = import.meta.glob("/src/content/**/*.md", {
    query: "?raw",
    import: "default",
  });

  const loadMarkdown = async (filePath: string) => {
    try {
      const loadFile = markdownFiles[filePath];
      if (!loadFile) {
        throw new Error(`File not found: ${filePath}`);
      }
      const markdown = (await loadFile()) as string;
      htmlContent.value = await parseMarkdown(markdown);
    } catch (error) {
      console.error(error);
      htmlContent.value = "<p>Error loading content</p>";
    }
  };

  return { htmlContent, loadMarkdown };
}
