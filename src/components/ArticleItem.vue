<template>
  <article
    :class="
      categories.length > 0 || content
        ? ''
        : 'flex justify-between flex-col sm:flex-row items-start sm:items-center'
    "
  >
    <h3 class="font-medium text-gray-800 dark:text-gray-200">
      <span class="underline-style">
        {{ title }}
      </span>
    </h3>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
      {{ date }}
      <span v-if="categories.length > 0">
        <span
          v-for="(category, categoryIndex) in categories"
          class="mx-1 text-gray-500 dark:text-gray-400"
          :key="categoryIndex"
        >
          <RouterLink :to="`/category/${category.replace('#', '')}`">
            <!--  :variant="free ? 'secondary' : 'default'" -->
            <Badge class="badge-base" :class="free ? 'badge' : 'badge-pro'">
              {{ category }}
            </Badge>
          </RouterLink>
        </span>
      </span>
    </p>
    <p v-if="content" class="mt-4 text-gray-600 dark:text-gray-400">
      {{ content }}
    </p>
  </article>
</template>
<script lang="ts" setup>
import { Badge } from "@/components/ui/badge";
import { RouterLink } from "vue-router";

const props = defineProps<{
  title: string;
  date: string;
  categories: string[];
  content: string;
  free: boolean;
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
