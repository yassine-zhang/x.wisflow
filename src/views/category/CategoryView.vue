<template>
  <div
    ref="rootElement"
    :style="{ marginBottom: remainingHeight + 'px' }"
    class="flex flex-col items-start"
  >
    <h1 class="text-2xl font-semibold mb-2">专栏分类</h1>
    <p class="text-gray-500 dark:text-gray-400">
      专栏对文章进行了分类，方便你快速找到感兴趣的内容。
    </p>

    <div class="w-full mt-8">
      <div class="flex items-center justify-between">
        <!-- 左边专栏筛选Option -->
        <div class="w-full flex items-center justify-start gap-2">
          <span class="font-medium">我的专栏和文章列表</span>
          <Button
            variant="outline"
            class="font-normal scale-90 px-2 py-1 h-8 gap-1"
          >
            <Icon icon="mi:add" class="w-4 h-4" /> 新建
          </Button>
        </div>

        <!-- 右边切换布局按钮 -->
        <div class="flex items-center gap-2">
          <Icon
            class="cursor-pointer transition-style"
            :class="
              isGridLayout
                ? 'text-black dark:text-white'
                : 'text-gray-400 dark:text-gray-500'
            "
            @click="setGridLayout(true)"
            icon="tabler:layout-grid"
            width="22"
            height="22"
          />
          <Icon
            class="cursor-pointer transition-style"
            :class="
              !isGridLayout
                ? 'text-black dark:text-white'
                : 'text-gray-400 dark:text-gray-500'
            "
            @click="setGridLayout(false)"
            icon="tabler:list"
            width="26"
            height="26"
          />
        </div>
      </div>
      <div class="h-[1px] bg-gray-200 dark:bg-gray-600 w-full mt-2"></div>
    </div>

    <!-- 网格布局专栏 -->
    <div
      v-if="isGridLayout"
      class="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3"
    >
      <div
        class="cursor-pointer rounded-md border-dashed border-2 border-gray-300 dark:border-gray-500 hover:border-black dark:hover:border-white flex flex-col items-center justify-center p-4 transition-style"
      >
        <Icon icon="mi:add" width="24" height="24" />
        <span class="text-sm">新建专栏</span>
      </div>

      <CategoryItem
        v-for="(category, index) in dataStore.categories"
        :key="index"
        :data="category"
        :index="index"
        :allow-show-all="true"
      />
    </div>

    <!-- 列表布局专栏 -->
    <div class="w-full" v-else>
      <div
        v-for="(category, index) in dataStore.categories"
        :key="index"
        class="mb-12"
      >
        <div class="flex items-center justify-between gap-2 mt-4">
          <div class="flex items-center gap-2">
            <h3 class="text-md font-medium">{{ category.title }}</h3>
            <Badge variant="secondary"> {{ category.articleCount }} </Badge>
          </div>
          <RouterLink :to="`/category/${category.name}`">
            <Button variant="outline" class="font-normal scale-90 gap-1">
              更多 <Icon icon="tabler:chevron-right" class="w-4 h-4" />
            </Button>
          </RouterLink>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ category.description }}
        </p>
        <div
          class="relative overflow-hidden transition-transform duration-300 ease-out flex flex-col px-4 mt-4 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-100/50 dark:bg-gray-700/50"
          @mousemove="handleMouseMove"
          @mouseleave="resetTransform"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-transparent to-transparent pointer-events-none transition-all duration-500"
            ref="rippleEffect"
          ></div>
          <ArticleItem
            v-for="(article, index) in filteredArticles(category.title).slice(
              0,
              dataStore.sliceCounts.articles,
            )"
            :key="index"
            class="my-2 sm:my-4"
            :data="article"
            :allow-show-all="false"
          />
        </div>
      </div>
    </div>
    <CdButton />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { calculateRemainingHeight } from "@/utils/calculateRemainingHeight";
import CdButton from "@/components/CdButton.vue";
import { Icon } from "@iconify/vue";
import CategoryItem from "@/components/CategoryItem.vue";
import ArticleItem from "@/components/ArticleItem.vue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDataStore } from "@/stores/useDataStore";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const remainingHeight = ref<number | undefined>(0);
const rootElement = ref<HTMLElement | null>(null);
const dataStore = useDataStore();

const isGridLayout = ref(true);
function setGridLayout(value: boolean) {
  isGridLayout.value = value;
  router.push({
    query: {
      type: value ? "grid" : "list",
    },
  });
}

const isDarkMode = ref(false);

const updateThemeMode = () => {
  const themeMode = sessionStorage.getItem("theme-mode") || "auto";
  if (themeMode === "light") {
    isDarkMode.value = false;
  } else if (themeMode === "dark") {
    isDarkMode.value = true;
  } else {
    // auto mode
    isDarkMode.value = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
  }
};

const handleMouseMove = (e: MouseEvent) => {
  updateThemeMode();

  const element = e.currentTarget as HTMLElement;
  const rect = element.getBoundingClientRect();
  const centerGorizontal = rect.width / 2;
  const centerVertical = rect.height / 2;

  const resultHover1 = centerGorizontal - (e.clientX - rect.left);
  const resultHover2 = centerVertical - (e.clientY - rect.top);

  element.style.transform = `perspective(800px) rotateY(${resultHover1 / 120}deg) rotateX(${resultHover2 / 120}deg)`;

  const ripple = element.querySelector(".bg-gradient-to-r") as HTMLElement;
  if (ripple) {
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rippleColor = isDarkMode.value
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)";
    ripple.style.background = `radial-gradient(circle at ${x}px ${y}px, ${rippleColor}, transparent)`;
  }
};

const resetTransform = (e: MouseEvent) => {
  const element = e.currentTarget as HTMLElement;
  element.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";

  const ripple = element.querySelector(".bg-gradient-to-r") as HTMLElement;
  if (ripple) {
    ripple.style.background = "transparent";
  }
};

const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const updateDarkMode = (e: MediaQueryListEvent) => {
  if (sessionStorage.getItem("theme-mode") === "auto") {
    isDarkMode.value = e.matches;
  }
};

// 计算属性，用于过滤文章
const filteredArticles = computed(() => {
  return (categoryTitle: string) => {
    return dataStore.articles.filter((article) =>
      article.categories.includes(categoryTitle),
    );
  };
});

watch(
  () => route.query.type,
  (newType) => {
    if (newType === "list") {
      isGridLayout.value = false;
    } else if (newType === "grid") {
      isGridLayout.value = true;
    }
  },
);

onMounted(() => {
  const rootHeight = rootElement.value?.offsetHeight || 0;
  remainingHeight.value = calculateRemainingHeight(248 + rootHeight);

  if (route.query.type === "list") isGridLayout.value = false;

  updateThemeMode();
  darkModeMediaQuery.addEventListener("change", updateDarkMode);
});

onUnmounted(() => {
  darkModeMediaQuery.removeEventListener("change", updateDarkMode);
});
</script>

<style>
.hover-effect {
  transition: transform 0.3s ease-out;
}
</style>
