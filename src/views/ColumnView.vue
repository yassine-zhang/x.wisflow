<template>
  <div
    ref="rootElement"
    :style="{ marginBottom: remainingHeight + 'px' }"
    class="p-4 flex flex-col items-start"
  >
    <h1 class="text-2xl font-semibold mb-2">专栏分类</h1>
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
