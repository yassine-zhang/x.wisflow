<template>
  <div
    ref="rootElement"
    :style="{ marginBottom: remainingHeight + 'px' }"
    class="mt-0"
  >
    <h1 class="text-2xl font-medium mb-4">Projects 我的项目</h1>
    <div class="mt-14">
      <h2 class="underline-style">qrcode.vue</h2>
      <p class="text-sm text-gray-500 mt-2 dark:text-gray-400">
        2024 年 8 月 22 日
      </p>
      <p class="mt-4 text-gray-500 dark:text-gray-400">
        A Vue.js component to generate qrcode. Supports both Vue 2 and Vue 3. —
        一款同时支持 Vue 2 和 Vue 3 的二维码组件。
      </p>
    </div>
    <CdButton />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { calculateRemainingHeight } from "@/utils/calculateRemainingHeight";
import CdButton from "@/components/CdButton.vue";

const remainingHeight = ref<number | undefined>(0);
const rootElement = ref<HTMLElement | null>(null);

onMounted(() => {
  const rootHeight = rootElement.value?.offsetHeight || 0;
  remainingHeight.value = calculateRemainingHeight(248 + rootHeight);
});
</script>
