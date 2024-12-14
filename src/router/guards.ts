import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useStaticMarkdownLoader } from "@/composables/useStaticMarkdownLoader";
import { useGlobMarkdownLoader } from "@/composables/useGlobMarkdownLoader";
import { useProgressStore } from "@/stores/progress";
import { useDataStore } from "@/stores/useDataStore";
import { nextTick } from "vue";
import dayjs from "dayjs";
import { calculateReadingTime } from "@/utils/readingTime";
import meMarkdown from "@/content/base/me.md?raw";

export const meBeforeEnter = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const { loadMarkdown, htmlContent } = useStaticMarkdownLoader();
  const progressStore = useProgressStore();
  progressStore.setProgress(0);

  await loadMarkdown(meMarkdown, (progress: number) => {
    progressStore.setProgress(progress);
  });

  to.params.htmlContent = htmlContent.value;
  next();
};

export const blogBeforeEnter = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const progressStore = useProgressStore();
  const dataStore = useDataStore();
  const { loadMarkdown, htmlContent } = useGlobMarkdownLoader();
  progressStore.setProgress(0);

  const { prefix, slug } = to.params;
  const articleData = dataStore.findArticleData(
    Array.isArray(prefix) ? prefix[0] : prefix,
    Array.isArray(slug) ? slug[0] : slug,
  );

  await nextTick();

  if (articleData) {
    await loadMarkdown(articleData.path, (progress: number) => {
      progressStore.setProgress(progress);
    });

    to.params = {
      htmlContent: htmlContent.value,
      readingTime: calculateReadingTime(htmlContent.value).toString(),
      date: dayjs(articleData.date).format("YYYY 年 MM 月 DD 日"),
      title: articleData.title,
      content: articleData.content,
    };
    next();
  } else {
    next(false); // or redirect to a 404 page
  }
};
