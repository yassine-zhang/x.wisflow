<template>
  <article
    :class="
      allowShowAll
        ? ''
        : 'flex justify-between flex-col sm:flex-row items-start sm:items-center'
    "
  >
    <h3 class="font-medium text-gray-800 dark:text-gray-200">
      <RouterLink :to="`/blog/${data.slug}`" class="underline-style">
        {{ data.title }}
      </RouterLink>
    </h3>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
      {{ data.date }}
      <span v-if="data.categories.length > 0 && allowShowAll">
        <span
          v-for="(category, categoryIndex) in data.categories"
          class="mx-1 text-gray-500 dark:text-gray-400"
          :key="categoryIndex"
        >
          <RouterLink :to="`/category/${category}`">
            <Badge
              class="badge-base"
              :class="data.free ? 'badge' : 'badge-pro'"
            >
              {{ category }}
            </Badge>
          </RouterLink>
        </span>
      </span>
    </p>
    <p
      v-if="data.content && allowShowAll"
      class="mt-4 text-gray-600 dark:text-gray-400"
    >
      {{ data.content }}
    </p>
  </article>
</template>
<script lang="ts" setup>
import { Badge } from "@/components/ui/badge";
import { RouterLink } from "vue-router";

const props = defineProps<{
  data: {
    title: string;
    date: string;
    categories: string[];
    content: string;
    free: boolean;
    slug: string;
  };
  allowShowAll: boolean;
}>();
</script>
<style scoped>
/* 徽章等级，默认和专业版 */
.badge-base {
  @apply text-xs bg-opacity-75  px-2 py-1 rounded-tl-lg rounded-br-lg inline-flex items-center;
}
.badge {
  @apply bg-gray-800 dark:bg-gray-600 text-white;
}
.badge-pro {
  @apply bg-yellow-400 dark:bg-yellow-400 text-black;
}
</style>
