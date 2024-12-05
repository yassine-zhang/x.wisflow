<template>
  <div ref="rootElement" :style="{ marginBottom: remainingHeight + 'px' }">
    <h1 class="text-2xl font-bold">文章</h1>
    <!-- 文章内容 -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { calculateRemainingHeight } from "@/utils/calculateRemainingHeight";

const remainingHeight = ref<number | undefined>(0);
const rootElement = ref<HTMLElement | null>(null);

onMounted(() => {
  const rootHeight = rootElement.value?.offsetHeight || 0;
  remainingHeight.value = calculateRemainingHeight(248 + rootHeight);
});
</script>
