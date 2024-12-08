<script setup lang="ts">
import { RouterLink } from "vue-router";

const props = defineProps<{
  title: string;
  date: string;
  categories: string[];
  content: string;
}>();
</script>

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
          <RouterLink
            :to="`/category/${category.replace('#', '')}`"
            class="underline-style"
          >
            {{ category }}
          </RouterLink>
        </span>
      </span>
    </p>
    <p v-if="content" class="mt-4 text-gray-600 dark:text-gray-400">
      {{ content }}
    </p>
  </article>
</template>
