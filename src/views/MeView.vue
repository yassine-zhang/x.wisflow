<script setup lang="ts">
import { ref, onMounted } from "vue";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { get } from "@/service/base/requests";

// 用于存储解析后的 HTML 内容
const markdownContent = ref("");

// 读取并解析 Markdown 文件
onMounted(async () => {
  try {
    const markdown = await get<string>("/content/base/me.md", "text");
    const rawHtml = await marked(markdown);
    markdownContent.value = DOMPurify.sanitize(rawHtml);
  } catch (error) {
    console.error("Error loading markdown file:", error);
  }
});
</script>

<template>
  <div class="mb-28">
    <!-- 使用 v-html 指令渲染解析后的 HTML 内容 -->
    <div v-html="markdownContent" class="markdown-body"></div>
  </div>
</template>
