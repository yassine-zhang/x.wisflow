import { createRouter, createWebHistory } from "vue-router";
import RootView from "@/views/RootView.vue";
import ColumnView from "@/views/ColumnView.vue";
import ProjectsView from "@/views/ProjectsView.vue";
import MeView from "@/views/MeView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: RootView,
  },
  {
    path: "/column",
    name: "Column",
    component: ColumnView,
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
    path: "/columns/:id",
    name: "ColumnDetail",
    component: ColumnView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
