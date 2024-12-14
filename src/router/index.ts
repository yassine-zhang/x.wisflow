import { createRouter, createWebHistory } from "vue-router";
import RootView from "@/views/RootView.vue";
import {
  meBeforeEnter,
  blogBeforeEnter,
  initializeStoreGuard,
} from "@/router/guards";

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
    beforeEnter: meBeforeEnter,
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
    beforeEnter: blogBeforeEnter,
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach(initializeStoreGuard);

export default router;
