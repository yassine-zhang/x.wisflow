<template>
  <div
    class="column-item transition-style"
    @click="navigateToColumn(data.name)"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div>
      <h3 class="font-medium">{{ data.title }}</h3>
      <p class="mt-0.5 text-sm text-gray-500 dark:text-gray-400 truncate">
        {{ data.description }}
      </p>
    </div>
    <div class="mt-1 text-xs text-gray-500 dark:text-gray-400">
      <span class="text-gray-800 dark:text-gray-200">{{ formattedViews }}</span>
      次看过
    </div>
    <Badge
      class="badge-base"
      v-if="allowShowAll"
      :variant="data.free ? 'secondary' : 'default'"
    >
      <Icon
        icon="mdi:book-open-page-variant"
        class="icon"
        width="10"
        height="10"
      />
      <span class="text-xs">{{ data.articleCount }} 篇</span>
    </Badge>
    <Icon
      v-if="!allowShowAll && data.iconName.length"
      :icon="data.iconName"
      width="96"
      height="96"
      class="draggable-icon"
      :class="{ hovered: isHovered && !isMobileDevice() }"
    />
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import type { Category } from "@/types/dataTypes";
import { Badge } from "@/components/ui/badge";
import { useFormattedViews } from "@/composables/useFormattedViews";
import { isMobileDevice } from "@/utils/global";

const props = defineProps<{
  data: Category;
  index: number;
  allowShowAll: boolean;
}>();

const router = useRouter();

function navigateToColumn(index: string) {
  const categoryId = `${index}`;
  router.push(`/category/${categoryId}`);
}

const formattedViews = useFormattedViews(props.data.views);
const isHovered = ref(false); // 用于跟踪鼠标是否悬停
</script>

<style scoped>
.column-item {
  @apply w-full sm:max-w-none overflow-hidden flex flex-col justify-between cursor-pointer p-5 h-32 border rounded-md shadow-md scale-100 hover:scale-[101%];
  @apply border-2 border-gray-300 dark:border-gray-500 hover:border-gray-900 dark:hover:border-gray-100;
  box-shadow: 6px 6px 8px rgba(58, 61, 74, 0.02);
  position: relative; /* 添加相对定位以便绝对定位子元素 */
}

.badge-base {
  @apply absolute bottom-0 right-0 bg-opacity-75 px-2 py-1 rounded-tl-lg rounded-br-md flex items-center justify-center;
}
.badge {
  @apply bg-gray-800 dark:bg-gray-600 text-white;
}
.badge-pro {
  @apply bg-yellow-400 dark:bg-yellow-400 text-black;
}

.icon {
  @apply w-4 h-4 mr-1;
}

.draggable-icon {
  @apply absolute bottom-0 right-0 -z-10; /* 绝对定位到右下角 */
  @apply text-gray-300 dark:text-gray-500;
  transform: translate(40%, 40%); /* 让图标漏出一部分 */
  transition: transform 0.3s ease; /* 添加过渡效果 */
}

.draggable-icon.hovered {
  @apply text-gray-900 dark:text-gray-100;
  transform: translate(0, -20%); /* 鼠标悬停时移动到中间偏右 */
}
</style>
