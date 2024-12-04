import { marked } from "marked";
import { createStarryNight, common } from "@wooorm/starry-night";
import { toHtml } from "hast-util-to-html";
import DOMPurify from "dompurify";

export async function parseMarkdown(markdown: string): Promise<string> {
  const starryNight = await createStarryNight(common);

  // Renderer
  const renderer = new marked.Renderer();
  renderer.code = ({ text, lang }) => {
    const scope =
      starryNight.flagToScope(`source.${lang}`) ||
      starryNight.flagToScope("text.plain") ||
      "text.plain";
    const tree = starryNight.highlight(text, scope);
    return `<pre><code>${toHtml(tree)}</code></pre>`;
  };

  const rawHtml = await marked(markdown, { renderer });
  return DOMPurify.sanitize(rawHtml);
}
