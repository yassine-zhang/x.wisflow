<template>
  <div ref="rootElement" :style="{ marginBottom: remainingHeight + 'px' }">
    <h1>{{ route.params.slug }}</h1>
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

onMounted(() => {
  const rootHeight = rootElement.value?.offsetHeight || 0;
  remainingHeight.value = calculateRemainingHeight(248 + rootHeight);
});
</script>
