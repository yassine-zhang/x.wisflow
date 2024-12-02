<script setup lang="ts">
import { ref } from "vue";

const profile = ref({
  greeting: "Hi, I'm 吴文俊 👋",
  location: "居住上海（Shanghai, China）。",
  origin:
    "来自湖北孝感（位于中国大别山）的前端开发工程师，热爱 JavaScript 和 React。",
  hobbies: "日常生活中，我喜欢骑单车 🚴、钓鱼 🎣 和爬山 🧗。",
  experience:
    "拥有多年在电商、支付和医疗行业的丰富经验，最近加入了一家总部位于上海的互联网公司。",
  goal: "致力于通过技术和服务，推动中国健康事业的发展，提升健康管理与服务的质量和效率。",
  blog: "这是我的个人博客，旨在记录我的前端学习和工作历程。目前，我正在提升英语能力，并翻译一些英文文章。",
  contact:
    "你可以在 Twitter(@ngwwj) 和 GitHub(@scopewu) 上找到我。如果有关于前端技术或博客方面的问题，请随时通过电子邮件 scope.wu@gmail.com 与我联系。",
  recordDate: "2019 年 5 月 13 日，记录 `TIE.PUB`。",
});
</script>

<template>
  <div class="mb-28 default-gap">
    <header class="default-gap">
      <h1 class="font-bold text-gray-800 dark:text-gray-200">
        {{ profile.greeting }}
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        {{ profile.location }}
      </p>
      <p class="text-gray-600 dark:text-gray-400">
        {{ profile.origin + profile.hobbies }}
      </p>
    </header>

    <section class="default-gap">
      <p class="text-gray-600 dark:text-gray-400">
        {{ profile.experience + profile.goal }}
      </p>
    </section>

    <section>
      <p class="text-gray-600 dark:text-gray-400">{{ profile.blog }}</p>
    </section>

    <section>
      <p class="text-gray-600 dark:text-gray-400">{{ profile.contact }}</p>
    </section>

    <footer class="text-sm text-gray-500 dark:text-gray-300">
      {{ profile.recordDate }}
    </footer>
  </div>
</template>

<style scoped>
.default-gap {
  @apply flex flex-col gap-6;
}
</style>
