<template>
  <div ref="rootElement" :style="{ marginBottom: remainingHeight + 'px' }">
    <div v-html="htmlContent" class="markdown-body"></div>
    <CdButton></CdButton>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import CdButton from "@/components/CdButton.vue";
import { calculateRemainingHeight } from "@/utils/calculateRemainingHeight";
import { useRoute } from "vue-router";

const route = useRoute();
const remainingHeight = ref<number | undefined>(0);
const rootElement = ref<HTMLElement | null>(null);

// 获取路由参数中的 HTML 内容
const htmlContent = ref<string>((route.params.htmlContent as string) || "");

onMounted(() => {
  const rootHeight = rootElement.value?.offsetHeight || 0;
  remainingHeight.value = calculateRemainingHeight(248 + rootHeight);
});
</script>
