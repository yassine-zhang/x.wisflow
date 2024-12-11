<template>
  <div
    ref="rootElement"
    :style="{ marginBottom: remainingHeight + 'px' }"
    class="mt-0"
  >
    <h1 class="text-2xl font-medium mb-4">Projects 我的项目</h1>
    <div class="mt-14 flex flex-col gap-8">
      <ProjectItem
        v-for="project in projects"
        :key="project.title"
        :title="project.title"
        :date="project.date"
        :description="project.content"
      />
    </div>
    <CdButton />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDataStore } from "@/stores/useDataStore";
import { calculateRemainingHeight } from "@/utils/calculateRemainingHeight";
import CdButton from "@/components/CdButton.vue";
import ProjectItem from "@/components/ProjectItem.vue";

const remainingHeight = ref<number | undefined>(0);
const rootElement = ref<HTMLElement | null>(null);

const dataStore = useDataStore();
const projects = dataStore.projects;

onMounted(() => {
  const rootHeight = rootElement.value?.offsetHeight || 0;
  remainingHeight.value = calculateRemainingHeight(248 + rootHeight);
});
</script>
