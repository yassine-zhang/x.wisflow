<template>
  <article>
    <h2 class="inline-block underline-style">{{ title }}</h2>
    <p class="text-sm text-gray-500 mt-2 dark:text-gray-400">{{ date }}</p>
    <p class="mt-4 text-gray-500 dark:text-gray-400">{{ description }}</p>
  </article>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  title: string;
  date: string;
  description: string;
}>();
</script>
