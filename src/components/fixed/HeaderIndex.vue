<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useColorMode } from "@vueuse/core";
import { computed } from "vue";
import { useRoute } from "vue-router";

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
const route = useRoute();

// 判断是否为根目录
const isRoot = computed(() => route.path === "/");
</script>

<template>
  <div class="flex items-center justify-between py-4">
    <router-link to="/">
      <img
        src="@/assets/images/avatar.jpeg"
        alt="Profile"
        class="w-14 h-14 rounded-full transition-shadow duration-300"
        :class="!isRoot ? 'hover:shadow-[0_0_0_2px_rgba(255,223,0,0.7)]' : ''"
      />
    </router-link>
    <nav class="flex space-x-4">
      <router-link to="/column" :class="linkStyles">专栏</router-link>
      <router-link to="/projects" :class="linkStyles">项目</router-link>
      <router-link to="/me" :class="linkStyles">关于</router-link>
      <button
        @click="toggleTheme"
        class="text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white transition-style"
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
