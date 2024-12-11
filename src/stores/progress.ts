import { ref } from "vue";
import { defineStore } from "pinia";

export const useProgressStore = defineStore("progressStore", () => {
  const progressValue = ref(0);

  function setProgress(value: number) {
    progressValue.value = value;
  }

  return { progressValue, setProgress };
});
