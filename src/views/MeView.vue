<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { calculateRemainingHeight } from "@/utils/calculateRemainingHeight";

const route = useRoute();
const htmlContent = ref<string>((route.params.htmlContent as string) || "");

const remainingHeight = ref<number | undefined>(0);
const rootElement = ref<HTMLElement | null>(null);

onMounted(() => {
  const rootHeight = rootElement.value?.offsetHeight || 0;
  remainingHeight.value = calculateRemainingHeight(248 + rootHeight);
});
</script>

<template>
  <div ref="rootElement" :style="{ marginBottom: remainingHeight + 'px' }">
    <div v-html="htmlContent" class="markdown-body"></div>
  </div>
</template>
