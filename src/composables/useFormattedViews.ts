import { computed } from "vue";

export function useFormattedViews(value: number) {
  return computed(() => {
    if (value >= 1000) {
      return (value / 1000).toFixed(value % 1000 === 0 ? 0 : 2) + "k";
    }
    return value.toString();
  });
}
