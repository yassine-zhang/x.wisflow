<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref, onMounted } from "vue";
import { useMotion } from "@vueuse/motion";

const socialIconsParent = ref<HTMLElement | null>(null);

const profile = ref({
  name: "张永鑫",
  greeting: "Hi, I'm 张永鑫 👋",
  description:
    "前端开发工程师，热爱 JavaScript 和 React。日常生活中，我喜欢骑单车 🚴、钓鱼 🎣 和爬山 🧗。",
  recordDate: "2019 年 5 月 13 日，记录 TIE.PUB。",
  socialIcons: [
    { icon: "mdi:twitter", color: "text-blue-500" },
    { icon: "mdi:github", color: "text-gray-800 dark:text-gray-200" },
    { icon: "mdi:email", color: "text-red-500" },
  ],
});

onMounted(() => {
  if (socialIconsParent.value) {
    const icons = socialIconsParent.value.querySelectorAll("a");
    icons.forEach((icon) => {
      useMotion(icon, {
        initial: {
          rotate: 0,
        },
        hovered: {
          rotate: 15,
        },
      });
    });
  }
});

const articles = ref([
  {
    title: "JavaScript 对象分组方法 `Object.groupBy()` 和 `Map.groupBy()`",
    date: "2024 年 10 月 12 日",
    tags: ["#javascript"],
    content:
      "在日常开发中我们经常需要对数组和类数组等可迭代对象按照一定的条件进行分组，现在 JavaScript 支持静态方法 Object.groupBy() 和 Map.groupBy()",
  },
  {
    title: "尽情使用 AbortController（Don't Sleep on AbortController）",
    date: "2024 年 9 月 29 日",
    tags: ["#javascript"],
    content:
      "AbortController 是一个标准的 JavaScript API，当需要取消请求、移除事件监听器、中止流，或使任何逻辑程序中止时，你都可以有效地利用 AbortController。",
  },
  {
    title: "React 19 更新精简纪要",
    date: "2024 年 9 月 26 日",
    tags: ["#react", "#javascript"],
    content:
      "最近知名的 React 开发者 Kent C. Dodds 发表一页 React 19 的功能更新纪要，精简到一页 PDF。",
  },
]);

const experiences = ref([
  {
    title: "高级前端工程师",
    company: "嘉会医院",
    date: "7月2021 - 此刻",
    content:
      "嘉会医疗前端组负责开发医院及各科室的网站和终端嵌入应用，包括药物信息、药品信息、就医流程等内容。同时，我们还开发和管理医院运行所需的系统，包括科室管理、药物管理、医生信息、诊疗价格和健康知识等。我们的工作还涵盖优惠和保险系统的对接以及其他第三方服务的整合。",
  },
  {
    title: "高级前端工程师",
    company: "众安保险",
    date: "8月2020 - 7月2021",
    content:
      "该项目由众安保险公司提供，结合了互联网保险和医疗服务，涵盖在线图文问诊、视频问诊、医生在线开处方以及患者在线购药。项目不仅与众安保险的健康险业务无缝集成，还支持与云闪付等不同渠道的对接。",
  },
]);

const projects = ref([
  {
    title: "qrcode.vue",
    date: "2024 年 8 月 22 日",
    content:
      "A Vue.js component to generate qrcode. Supports both Vue 2 and Vue 3. 一款同时支持 Vue 2 和 Vue 3 的二维码组件。",
  },
]);
</script>

<template>
  <section>
    <header>
      <p class="text-gray-600 dark:text-gray-400">CoolCat</p>
      <h1 class="font-bold text-gray-800 dark:text-gray-200">
        {{ profile.greeting }}
      </h1>
      <p class="mt-3 text-gray-600 dark:text-gray-400">
        {{ profile.description }}
      </p>
      <p class="mt-2 text-gray-500 dark:text-gray-300">
        {{ profile.recordDate }}
      </p>
      <div ref="socialIconsParent" class="flex gap-2 mt-4">
        <a
          v-for="(icon, index) in profile.socialIcons"
          :key="index"
          href="#"
          target="_blank"
        >
          <Icon :icon="icon.icon" :class="['w-6 h-6', icon.color]" />
        </a>
      </div>
    </header>

    <section class="mt-16">
      <header class="flex items-center justify-between">
        <h2 class="font-semibold text-gray-800 dark:text-gray-200">近期文章</h2>
        <button
          class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-style"
        >
          全部文章
        </button>
      </header>
      <article v-for="(article, index) in articles" :key="index" class="my-6">
        <h3 class="font-medium text-gray-800 dark:text-gray-200">
          <span class="underline-style">
            {{ article.title }}
          </span>
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ article.date }}
          <span
            v-for="(tag, tagIndex) in article.tags"
            class="mx-1 text-gray-500 dark:text-gray-400"
            :key="tagIndex"
          >
            <router-link
              :to="`/tags/${tag.replace('#', '')}`"
              class="underline-style"
            >
              {{ tag }}
            </router-link>
          </span>
        </p>
        <p v-if="article.content" class="mt-4 text-gray-600 dark:text-gray-400">
          {{ article.content }}
        </p>
      </article>
    </section>

    <section class="mt-16">
      <header class="flex items-center justify-between">
        <h2 class="font-semibold text-gray-800 dark:text-gray-200">工作经验</h2>
        <button
          class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-style"
        >
          工作历程
        </button>
      </header>
      <article
        v-for="(experience, index) in experiences"
        :key="index"
        class="my-6"
      >
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ experience.date }}
        </p>
        <h3 class="font-medium text-gray-800 leading-8 dark:text-gray-200">
          {{ experience.company }}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ experience.title }}
        </p>
        <p
          v-if="experience.content"
          class="mt-4 text-gray-600 dark:text-gray-400"
        >
          {{ experience.content }}
        </p>
      </article>
    </section>

    <section class="mt-16">
      <header class="flex items-center justify-between">
        <h2 class="font-semibold text-gray-800 dark:text-gray-200">近期项目</h2>
        <button
          class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-style"
        >
          全部项目
        </button>
      </header>
      <article v-for="(project, index) in projects" :key="index" class="my-6">
        <h3 class="font-medium text-gray-800 dark:text-gray-200">
          <span class="underline-style">
            {{ project.title }}
          </span>
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ project.date }}
        </p>
        <p v-if="project.content" class="mt-4 text-gray-600 dark:text-gray-400">
          {{ project.content }}
        </p>
      </article>
    </section>
  </section>
</template>
