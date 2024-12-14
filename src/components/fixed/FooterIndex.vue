<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";

// 定义数据
const currentYear = ref(new Date().getFullYear());
const isButtonVisible = ref(false);

// 获取当前路由
const route = useRoute();

// 定义滚动到顶部的函数
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// 检查内容高度是否大于窗口高度加上200px
const checkContentHeight = () => {
  isButtonVisible.value = document.body.scrollHeight > window.innerHeight + 200;
};

// 监听窗口大小变化
onMounted(() => {
  checkContentHeight();
  window.addEventListener("resize", checkContentHeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkContentHeight);
});

// 监听路由变化
watch(route, () => {
  checkContentHeight();
});
</script>

<template>
  <footer class="flex flex-col items-end">
    <button
      v-if="isButtonVisible"
      class="flex justify-center group relative w-8 h-8 border-[1px] border-gray-200 dark:border-gray-700 rounded transition-style hover:bg-gray-100 dark:hover:bg-gray-800"
      @click="scrollToTop"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="absolute top-1/2 -translate-y-1/2 size-4 stroke-2 fill-none stroke-current rotate-90"
      >
        <line
          x1="5"
          y1="12"
          x2="19"
          y2="12"
          class="translate-x-2 group-hover:translate-x-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"
        ></line>
        <polyline
          points="12 5 5 12 12 19"
          class="translate-x-1 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
        ></polyline>
      </svg>
    </button>
    <div class="w-full flex justify-between items-center mb-12 mt-6">
      <div class="text-gray-500 dark:text-gray-400">
        © {{ currentYear }} 济宁若森软件开发中心
      </div>
      <div class="flex items-center space-x-4">
        <a href="#" class="text-gray-500 dark:text-gray-400 underline-style"
          >RSS</a
        >
      </div>
    </div>
  </footer>
</template>
