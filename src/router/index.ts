import { createRouter, createWebHistory } from "vue-router";
import RootView from "@/views/RootView.vue";
import BlogsView from "@/views/BlogsView.vue";
import ProjectsView from "@/views/ProjectsView.vue";
import MeView from "@/views/MeView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: RootView,
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: BlogsView,
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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
