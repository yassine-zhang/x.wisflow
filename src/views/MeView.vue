<script setup lang="ts">
import { ref, onMounted } from "vue";
import { get } from "@/service/base/requests";
import { parseMarkdown } from "@/utils/markdownUtils";

// 用于存储解析后的 HTML 内容
const markdownContent = ref("");

// 读取并解析 Markdown 文件
onMounted(async () => {
  const markdown = await get<string>("/content/base/me.md", "text");
  markdownContent.value = await parseMarkdown(markdown);
});
</script>

<template>
  <div class="mb-28">
    <!-- 使用 v-html 指令渲染解析后的 HTML 内容 -->
    <div v-html="markdownContent" class="markdown-body"></div>
  </div>
</template>
