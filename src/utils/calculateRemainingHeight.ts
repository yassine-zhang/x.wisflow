import { useWindowSize } from "@vueuse/core";

export function calculateRemainingHeight(
  occupiedHeight: number,
): number | undefined {
  const { height: viewportHeight } = useWindowSize();

  const remainingHeight = viewportHeight.value - occupiedHeight;

  return remainingHeight > 0 ? remainingHeight : undefined;
}
