import { createRouter, createWebHistory } from "vue-router";
import RootView from "@/views/RootView.vue";

import CategoryView from "@/views/category/CategoryView.vue";
import CategoryDetail from "@/views/category/CategoryDetail.vue";

import ProjectsView from "@/views/ProjectsView.vue";
import MeView from "@/views/MeView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: RootView,
  },
  {
    path: "/category",
    name: "Category",
    component: CategoryView,
  },
  {
    path: "/projects",
    name: "Projects",
    component: ProjectsView,
  },
  {
    path: "/me",
    name: "Me",
    component: MeView,
  },
  {
    path: "/category/:id",
    name: "CategoryDetail",
    component: CategoryDetail,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
