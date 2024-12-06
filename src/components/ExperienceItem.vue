<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  title: string;
  company: string;
  date: string;
  content: string;
}>();
</script>

<template>
  <article>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
      {{ date }}
    </p>
    <h3 class="font-medium text-gray-800 leading-8 dark:text-gray-200">
      {{ company }}
    </h3>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      {{ title }}
    </p>
    <p v-if="content" class="mt-4 text-gray-600 dark:text-gray-400">
      {{ content }}
    </p>
  </article>
</template>
