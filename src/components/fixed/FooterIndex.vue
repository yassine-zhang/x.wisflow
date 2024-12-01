<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

// 定义数据
const currentYear = ref(new Date().getFullYear());

// 定义滚动到顶部的函数
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<template>
  <footer class="flex flex-col items-end">
    <div
      class="w-8 h-8 border-[1px] border-gray-200 dark:border-gray-700 rounded flex items-center justify-center cursor-pointer transition-style hover:bg-gray-100 dark:hover:bg-gray-800"
      @click="scrollToTop"
    >
      <Icon icon="oui:arrow-up" width="16" height="16" />
    </div>
    <div class="w-full flex justify-between items-center mb-12 mt-6">
      <div class="text-gray-500 dark:text-gray-400">
        © {{ currentYear }} CoolCat
      </div>
      <div class="flex items-center space-x-4">
        <a href="#" class="text-gray-500 dark:text-gray-400 underline-style"
          >RSS</a
        >
      </div>
    </div>
  </footer>
</template>
