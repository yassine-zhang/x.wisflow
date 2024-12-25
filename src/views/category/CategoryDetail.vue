<template>
  <div
    class="flex flex-col items-start"
    ref="rootElement"
    :style="{ marginBottom: remainingHeight + 'px' }"
  >
    <h1 class="font-medium text-3xl mb-1 text-gray-800 dark:text-gray-200">
      {{ categoryData?.title }}
    </h1>
    <div
      class="flex items-center gap-2 sm:gap-4 pl-1 mb-2 text-sm text-gray-500 dark:text-gray-400"
    >
      <p>
        <span class="highlight-indicator">{{
          useFormattedViews(categoryData?.articleCount || 0)
        }}</span>
        文档
      </p>
      <p>
        <span class="highlight-indicator">{{
          useFormattedViews(categoryData?.views || 0)
        }}</span>
        浏览
      </p>
      <p class="flex items-center gap-1">
        <span class="highlight-indicator">{{
          useFormattedViews(categoryData?.words || 0)
        }}</span>
        字
        <TooltipProvider>
          <Tooltip :delay-duration="200">
            <TooltipTrigger
              ><Icon icon="mingcute:warning-line" width="16" height="16"
            /></TooltipTrigger>
            <TooltipContent side="right">
              <p>每天早上 8 点，系统会自动统计字数</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </p>
    </div>
    <div class="pl-1 mb-8 text-md text-gray-500 dark:text-gray-400">
      > {{ categoryData?.description }}
    </div>

    <section class="w-full flex flex-col">
      <ArticleItem
        v-for="(article, index) in dataStore.filterArticlesByCategory(
          categoryName,
        )"
        class="my-2"
        :key="index"
        :allow-show-all="false"
        :data="article"
      >
      </ArticleItem>
    </section>
    <CdButton />
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import CdButton from "@/components/CdButton.vue";
import { calculateRemainingHeight } from "@/utils/calculateRemainingHeight";
import ArticleItem from "@/components/ArticleItem.vue";
import { useDataStore } from "@/stores/useDataStore";
import { useFormattedViews } from "@/composables/useFormattedViews";
import { Icon } from "@iconify/vue/dist/iconify.js";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const route = useRoute();
const dataStore = useDataStore();
const remainingHeight = ref<number | undefined>(0);
const rootElement = ref<HTMLElement | null>(null);
const categoryName = route.params.id as string;
const categoryData = dataStore.findCategoryByName(categoryName);

onMounted(() => {
  const rootHeight = rootElement.value?.offsetHeight || 0;
  remainingHeight.value = calculateRemainingHeight(248 + rootHeight);
});
</script>
<style scoped>
.highlight-indicator {
  @apply text-gray-700 dark:text-gray-200 font-semibold;
}
</style>
