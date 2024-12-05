<template>
  <button class="mt-16" @click="navigateToRoot">
    <span class="text-gray-400 dark:text-gray-500 mr-2">&gt;</span>
    <span class="text-gray-600 dark:text-gray-300 underline-style">cd ..</span>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function navigateToRoot() {
  router.push("/");
}
</script>

<style scoped>
/* 如果有需要，可以在这里添加组件特定的样式 */
</style>
