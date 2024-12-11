<template>
  <div
    ref="rootElement"
    class="flex flex-col items-start"
    :style="{ marginBottom: remainingHeight + 'px' }"
  >
    <h1 class="text-2xl font-bold mb-4">Work工作历程</h1>
    <ExperienceItem
      v-for="(experience, index) in dataStore.experiences"
      class="my-4"
      :key="index"
      :title="experience.title"
      :company="experience.company"
      :date="experience.date"
      :content="experience.content"
    />
    <CdButton></CdButton>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import CdButton from "@/components/CdButton.vue";
import { calculateRemainingHeight } from "@/utils/calculateRemainingHeight";
import ExperienceItem from "@/components/ExperienceItem.vue";
import { useDataStore } from "@/stores/useDataStore";

const remainingHeight = ref<number | undefined>(0);
const rootElement = ref<HTMLElement | null>(null);
const dataStore = useDataStore();

onMounted(() => {
  const rootHeight = rootElement.value?.offsetHeight || 0;
  remainingHeight.value = calculateRemainingHeight(248 + rootHeight);
});
</script>
