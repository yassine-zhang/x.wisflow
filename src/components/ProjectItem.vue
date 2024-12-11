<template>
  <article>
    <h2 class="inline-block underline-style">{{ title }}</h2>
    <p class="text-sm text-gray-500 mt-2 dark:text-gray-400">{{ date }}</p>
    <p class="mt-4 text-gray-500 dark:text-gray-400">{{ content }}</p>
  </article>
</template>

<script setup lang="ts">
import type { Project } from "@/types/dataTypes"; // 导入 Project 类型

const props = defineProps<Project>(); // 使用 Project 类型
</script>
