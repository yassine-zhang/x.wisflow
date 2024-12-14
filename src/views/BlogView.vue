<template>
  <div ref="rootElement" :style="{ marginBottom: remainingHeight + 'px' }">
    <p class="text-gray-700 dark:text-gray-300">
      {{ route.params.date }} · 阅读 {{ route.params.readingTime }} 分钟
    </p>
    <h1 class="mt-2 font-semibold text-4xl dark:text-white">
      {{ route.params.title }}
    </h1>
    <p class="my-6 text-gray-700 dark:text-gray-300">
      {{ route.params.content }}
    </p>
    <div v-html="htmlContent" class="markdown-body"></div>
    <CdButton></CdButton>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import CdButton from "@/components/CdButton.vue";
import { calculateRemainingHeight } from "@/utils/calculateRemainingHeight";
import { useRoute } from "vue-router";

const route = useRoute();
const remainingHeight = ref<number | undefined>(0);
const rootElement = ref<HTMLElement | null>(null);

// 获取路由参数中的 HTML 内容
const htmlContent = ref<string>((route.params.htmlContent as string) || "");

onMounted(() => {
  const rootHeight = rootElement.value?.offsetHeight || 0;
  remainingHeight.value = calculateRemainingHeight(248 + rootHeight);
});
</script>
