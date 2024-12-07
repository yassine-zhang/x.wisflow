<template>
  <div class="column-item transition-style" @click="navigateToColumn(index)">
    <div>
      <h3 class="font-medium">{{ column.title }}</h3>
      <p class="mt-0.5 text-sm text-gray-500 dark:text-gray-400 truncate">
        {{ column.description }}
      </p>
    </div>
    <div class="text-xs text-gray-500 dark:text-gray-400">
      <span class="text-gray-800 dark:text-gray-200">{{ column.views }}</span>
      次看过
    </div>
    <div v-if="column.articleCount" class="badge">
      <Icon icon="mdi:book-open-page-variant" class="icon" />
      <span class="text-sm">{{ column.articleCount }} 篇</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  column: {
    title: string;
    description: string;
    views: number;
    articleCount: number;
  };
  index: number;
}>();

const router = useRouter();

function navigateToColumn(index: number) {
  const columnId = `c-${index}`; // 假设每个专栏有一个唯一的 ID
  router.push(`/columns/${columnId}`);
}
</script>

<style scoped>
.column-item {
  @apply w-full max-w-96 sm:max-w-none flex flex-col justify-between cursor-pointer flex-1 p-5 h-32 border rounded-lg shadow-md border-gray-300 dark:border-gray-500 hover:border-gray-900 dark:hover:border-gray-100 scale-100 hover:scale-[101%];
  box-shadow: 6px 6px 8px rgba(58, 61, 74, 0.02);
}

.badge {
  @apply absolute bottom-0 right-0 bg-gray-800 dark:bg-gray-600 bg-opacity-75 text-white px-2 py-1 rounded-tl-lg rounded-br-lg flex items-center;
}

.icon {
  @apply w-4 h-4 mr-1;
}
</style>
