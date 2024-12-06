import { ref } from "vue";
import { parseMarkdown } from "@/utils/markdownUtils";

export function useStaticMarkdownLoader() {
  const htmlContent = ref("");

  const loadMarkdown = async (markdownContent: string) => {
    htmlContent.value = await parseMarkdown(markdownContent);
  };

  return { htmlContent, loadMarkdown };
}
