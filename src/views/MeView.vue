<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";
import { useStaticMarkdownLoader } from "@/composables/useStaticMarkdownLoader";
import { calculateRemainingHeight } from "@/utils/calculateRemainingHeight";
import meMarkdown from "@/content/base/me.md?raw";

const { htmlContent, loadMarkdown } = useStaticMarkdownLoader();

const remainingHeight = ref<number | undefined>(0);
const rootElement = ref<HTMLElement | null>(null);

onMounted(async () => {
  await loadMarkdown(meMarkdown);
  nextTick(() => {
    const rootHeight = rootElement.value?.offsetHeight || 0;
    remainingHeight.value = calculateRemainingHeight(248 + rootHeight);
  });
});
</script>

<template>
  <div ref="rootElement" :style="{ marginBottom: remainingHeight + 'px' }">
    <div v-html="htmlContent" class="markdown-body"></div>
  </div>
</template>
