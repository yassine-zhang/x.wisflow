<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useColorMode } from "@vueuse/core";
import { computed } from "vue";

// 封装样式逻辑
const useLinkStyles = () => {
  return computed(() => {
    const baseStyles =
      "text-gray-700 dark:text-gray-300 px-1 rounded-md transition-style";
    const hoverStyles =
      "hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700";
    return `${baseStyles} ${hoverStyles}`;
  });
};

const mode = useColorMode({
  disableTransition: true,
  storageKey: "theme-mode",
  storage: sessionStorage,
});

const toggleTheme = () => {
  mode.value = mode.value === "dark" ? "light" : "dark";
};

const linkStyles = useLinkStyles();
</script>

<template>
  <div class="flex items-center justify-between py-4">
    <img
      src="@/assets/images/avatar.jpeg"
      alt="Profile"
      class="w-14 h-14 rounded-full"
    />
    <nav class="flex space-x-4">
      <a href="#" :class="linkStyles">文章</a>
      <a href="#" :class="linkStyles">项目</a>
      <a href="#" :class="linkStyles">关于</a>
      <button
        @click="toggleTheme"
        class="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-style"
      >
        <Icon
          :icon="mode === 'dark' ? 'ph:moon-light' : 'ph:sun-light'"
          width="20"
          height="20"
        />
      </button>
    </nav>
  </div>
</template>
