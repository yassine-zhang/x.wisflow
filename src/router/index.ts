import { createRouter, createWebHistory } from "vue-router";
import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import RootView from "@/views/RootView.vue";
import { useStaticMarkdownLoader } from "@/composables/useStaticMarkdownLoader";
import meMarkdown from "@/content/base/me.md?raw";
import { useProgressStore } from "@/stores/progress";
import { useDataStore } from "@/stores/useDataStore";
import { useGlobMarkdownLoader } from "@/composables/useGlobMarkdownLoader";
import { nextTick } from "vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: RootView,
  },
  {
    path: "/category",
    name: "Category",
    component: () => import("@/views/category/CategoryView.vue"),
  },
  {
    path: "/projects",
    name: "Projects",
    component: () => import("@/views/ProjectsView.vue"),
  },
  {
    path: "/me",
    name: "Me",
    component: () => import("@/views/MeView.vue"),
    beforeEnter: async (
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
    },
  },
  {
    path: "/category/:id",
    name: "CategoryDetail",
    component: () => import("@/views/category/CategoryDetail.vue"),
  },
  {
    path: "/blog/:prefix/:slug",
    name: "Blog",
    component: () => import("@/views/BlogView.vue"),
    beforeEnter: async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      const progressStore = useProgressStore();
      const dataStore = useDataStore();
      const { loadMarkdown, htmlContent } = useGlobMarkdownLoader();
      progressStore.setProgress(0);

      const { prefix, slug } = to.params;
      const markdownPath = dataStore.findArticlePath(
        Array.isArray(prefix) ? prefix[0] : prefix,
        Array.isArray(slug) ? slug[0] : slug,
      );
      progressStore.setProgress(0);

      await nextTick();

      if (markdownPath) {
        await loadMarkdown(markdownPath, (progress: number) => {
          progressStore.setProgress(progress);
        });

        to.params.htmlContent = htmlContent.value;
        next();
      } else {
        next(false); // or redirect to a 404 page
      }
    },
  },
  {
    path: "/work",
    name: "Work",
    component: () => import("@/views/WorkView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
