import { ref } from "vue";
import { defineStore } from "pinia";

export const useProgressStore = defineStore("progress", () => {
  const progressValue = ref(0);

  function setProgress(value: number) {
    progressValue.value = value;
  }

  return { progressValue, setProgress };
});
