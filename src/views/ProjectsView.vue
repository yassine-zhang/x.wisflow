<template>
  <div
    ref="rootElement"
    :style="{ marginBottom: remainingHeight + 'px' }"
    class="mt-0"
  >
    <h1 class="text-2xl font-medium mb-4">Projects 我的项目</h1>
    <div class="mt-14 flex flex-col gap-8">
      <ProjectItem
        title="qrcode.vue"
        date="2024 年 8 月 22 日"
        description="A Vue.js component to generate qrcode. Supports both Vue 2 and Vue 3. — 一款同时支持 Vue 2 和 Vue 3 的二维码组件。"
      />
    </div>
    <CdButton />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { calculateRemainingHeight } from "@/utils/calculateRemainingHeight";
import CdButton from "@/components/CdButton.vue";
import ProjectItem from "@/components/ProjectItem.vue";

const remainingHeight = ref<number | undefined>(0);
const rootElement = ref<HTMLElement | null>(null);

onMounted(() => {
  const rootHeight = rootElement.value?.offsetHeight || 0;
  remainingHeight.value = calculateRemainingHeight(248 + rootHeight);
});
</script>
