<script setup lang="ts">
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps<{
  title: string;
  date: string;
  tags: string[];
  content: string;
}>();
</script>

<template>
  <article>
    <h3 class="font-medium text-gray-800 dark:text-gray-200">
      <span class="underline-style">
        {{ title }}
      </span>
    </h3>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
      {{ date }}
      <span
        v-for="(tag, tagIndex) in tags"
        class="mx-1 text-gray-500 dark:text-gray-400"
        :key="tagIndex"
      >
        <RouterLink
          :to="`/tags/${tag.replace('#', '')}`"
          class="underline-style"
        >
          {{ tag }}
        </RouterLink>
      </span>
    </p>
    <p v-if="content" class="mt-4 text-gray-600 dark:text-gray-400">
      {{ content }}
    </p>
  </article>
</template>
