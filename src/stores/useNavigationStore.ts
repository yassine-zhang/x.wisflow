import { defineStore } from "pinia";
import { ref } from "vue";
import type { RouteLocationNormalized } from "vue-router";

interface HistoryRecord {
  path: string;
  params: Record<string, any>;
  query: Record<string, any>;
}

export const useNavigationStore = defineStore("navigation", () => {
  const navigationHistory = ref<HistoryRecord[]>([]);

  function addToHistory(route: RouteLocationNormalized) {
    navigationHistory.value.push({
      path: route.path,
      params: { ...route.params },
      query: { ...route.query },
    });
  }

  function getPreviousPath(): HistoryRecord {
    if (navigationHistory.value.length > 1) {
      // 返回倒数第二个路由记录（当前路径的上一个）
      return navigationHistory.value[navigationHistory.value.length - 2];
    }
    return { path: "/", params: {}, query: {} };
  }

  return {
    navigationHistory,
    addToHistory,
    getPreviousPath,
  };
});
