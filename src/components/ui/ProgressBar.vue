<template>
  <div
    v-if="isVisible"
    class="absolute top-0 inset-x-0 w-full h-1 bg-gray-200 dark:bg-gray-800"
  >
    <div
      class="h-full bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-700 dark:to-green-700 transition-all duration-500 ease-out"
      :style="{ width: props.progress + '%' }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

const props = defineProps<{
  progress: number;
  allowHide: boolean;
}>();

const isVisible = ref(false);

const checkVisibility = (progress: number, delay: boolean = true) => {
  if (props.allowHide && (progress <= 0 || progress >= 100)) {
    if (delay) {
      setTimeout(() => {
        isVisible.value = false;
      }, 500);
    } else {
      isVisible.value = false;
    }
  } else {
    isVisible.value = true;
  }
};

watch(
  () => props.progress,
  (newProgress) => {
    checkVisibility(newProgress);
  },
);

onMounted(() => {
  checkVisibility(props.progress, false);
});
</script>
