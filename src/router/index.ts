import { createRouter, createWebHistory } from "vue-router";
import RootView from "@/views/RootView.vue";
import CategoryView from "@/views/CategoryView.vue";
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
    component: CategoryView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
