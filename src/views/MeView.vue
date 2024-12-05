<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { get } from "@/service/base/requests";
import { parseMarkdown } from "@/utils/markdownUtils";
import { calculateRemainingHeight } from "@/utils/calculateRemainingHeight";

// 用于存储解析后的 HTML 内容
const markdownContent = ref("");
const remainingHeight = ref<number | undefined>(0);
const rootElement = ref<HTMLElement | null>(null);

// 读取并解析 Markdown 文件
onMounted(async () => {
  const markdown = await get<string>("/content/base/me.md", "text");
  markdownContent.value = await parseMarkdown(markdown);

  nextTick(() => {
    const rootHeight = rootElement.value?.offsetHeight || 0;
    remainingHeight.value = calculateRemainingHeight(248 + rootHeight);
  });
});
</script>

<template>
  <div ref="rootElement" :style="{ marginBottom: remainingHeight + 'px' }">
    <!-- 使用 v-html 指令渲染解析后的 HTML 内容 -->
    <div v-html="markdownContent" class="markdown-body"></div>
  </div>
</template>
