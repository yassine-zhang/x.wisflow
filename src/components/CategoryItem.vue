<template>
  <div class="column-item transition-style" @click="navigateToColumn(index)">
    <div>
      <h3 class="font-medium">{{ data.title }}</h3>
      <p class="mt-0.5 text-sm text-gray-500 dark:text-gray-400 truncate">
        {{ data.description }}
      </p>
    </div>
    <div class="mt-1 text-xs text-gray-500 dark:text-gray-400">
      <span class="text-gray-800 dark:text-gray-200">{{ formattedViews }}</span>
      次看过
    </div>
    <div
      v-if="allowShowAll"
      class="badge-base"
      :class="data.free ? 'badge' : 'badge-pro'"
    >
      <Icon
        icon="mdi:book-open-page-variant"
        class="icon"
        width="10"
        height="10"
      />
      <span class="text-xs">{{ data.articleCount }} 篇</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import { computed } from "vue";
import type { Category } from "@/types/dataTypes";

const props = defineProps<{
  data: Category;
  index: number;
  allowShowAll: boolean;
}>();

const router = useRouter();

function navigateToColumn(index: number) {
  const categoryId = `${index}`;
  router.push(`/category/${categoryId}`);
}

const formattedViews = computed(() => {
  const views = props.data.views;
  if (views >= 1000) {
    return (views / 1000).toFixed(views % 1000 === 0 ? 0 : 2) + "k";
  }
  return views.toString();
});
</script>

<style scoped>
.column-item {
  @apply w-full sm:max-w-none flex flex-col justify-between cursor-pointer p-5 h-32 border rounded-lg shadow-md scale-100 hover:scale-[101%];
  @apply border-2 border-gray-300 dark:border-gray-500 hover:border-gray-900 dark:hover:border-gray-100;
  box-shadow: 6px 6px 8px rgba(58, 61, 74, 0.02);
}

.badge-base {
  @apply absolute bottom-0 right-0 bg-opacity-75 px-2 py-1 rounded-tl-lg rounded-br-md flex items-center justify-center;
}
.badge {
  @apply bg-gray-800 dark:bg-gray-600 text-white;
}
.badge-pro {
  @apply bg-yellow-400 dark:bg-yellow-400 text-black;
}

.icon {
  @apply w-4 h-4 mr-1;
}
</style>
