import { marked } from "marked";
import { createStarryNight, common } from "@wooorm/starry-night";
import sourceNginx from "@wooorm/starry-night/source.nginx";
import { toHtml } from "hast-util-to-html";
import DOMPurify from "dompurify";

const starryNight = await createStarryNight([...common, sourceNginx]);

export async function parseMarkdown(markdown: string): Promise<string> {
  // Renderer
  const renderer = new marked.Renderer();
  renderer.code = ({ text, lang }) => {
    const scope =
      starryNight.flagToScope(`source.${lang}`) ||
      starryNight.flagToScope("text.md") ||
      "text.md";

    const tree = starryNight.highlight(text, scope);
    return `<pre><code>${toHtml(tree)}</code></pre>`;
  };

  const rawHtml = await marked(markdown, { renderer });
  return DOMPurify.sanitize(rawHtml);
}
