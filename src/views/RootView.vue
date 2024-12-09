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

    <section class="item-outline">
      <header class="flex items-center justify-between">
        <h2 class="font-semibold text-gray-800 dark:text-gray-200">热门专栏</h2>
        <button
          class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-style"
          @click="navigateToCategory"
        >
          全部专栏
        </button>
      </header>

      <div class="flex flex-wrap-reverse gap-4 mt-4">
        <CategoryItem
          v-for="(category, index) in categories"
          :key="index"
          :data="category"
          :index="index"
        />
      </div>
    </section>

    <section class="item-outline">
      <header class="flex items-center justify-between">
        <h2 class="font-semibold text-gray-800 dark:text-gray-200">近期文章</h2>
        <button
          class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-style"
        >
          全部文章
        </button>
      </header>
      <ArticleItem
        v-for="(article, index) in articles"
        class="my-6"
        :key="index"
        :title="article.title"
        :date="article.date"
        :categories="article.categories"
        :content="article.content"
      />
    </section>

    <section class="item-outline">
      <header class="flex items-center justify-between">
        <h2 class="font-semibold text-gray-800 dark:text-gray-200">工作经验</h2>
        <button
          class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-style"
        >
          工作历程
        </button>
      </header>
      <ExperienceItem
        v-for="(experience, index) in experiences"
        class="my-6"
        :key="index"
        :title="experience.title"
        :company="experience.company"
        :date="experience.date"
        :content="experience.content"
      />
    </section>

    <section class="item-outline">
      <header class="flex items-center justify-between">
        <h2 class="font-semibold text-gray-800 dark:text-gray-200">近期项目</h2>
        <button
          class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-style"
        >
          全部项目
        </button>
      </header>
      <ProjectItem
        v-for="(project, index) in projects"
        class="my-6"
        :key="index"
        :title="project.title"
        :date="project.date"
        :description="project.content"
      />
    </section>
  </section>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMotion } from "@vueuse/motion";
import ProjectItem from "@/components/ProjectItem.vue";
import ExperienceItem from "@/components/ExperienceItem.vue";
import ArticleItem from "@/components/ArticleItem.vue";
import CategoryItem from "@/components/CategoryItem.vue";

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

const categories = ref([
  {
    title: "物联网技能大赛知识预览",
    description: "了解技能大赛笔记入口",
    views: 4078,
    articleCount: 0,
    free: true,
  },
  {
    title: "Element Plus 组件库学习",
    description: "基于 Vue 3，面向设计师和开发者的组件库",
    views: 41,
    articleCount: 0,
    free: true,
  },
  {
    title: "Web全栈开发-企业解决方案",
    description:
      "在阅本专栏期刊之前，我强烈建议您有必要了解以下技术栈，以充分理解讲解内容意图，如有不明之处请加我好友咨询（备注来意）",
    views: 9637,
    articleCount: 0,
    free: false,
  },
]);

const articles = ref([
  {
    title: "JavaScript 对分组方法 `Object.groupBy()` 和 `Map.groupBy()`",
    date: "2024 年 10 月 12 日",
    categories: ["#javascript"],
    content:
      "在日常开发中我们经常需要对数组和类数组等可迭代对象按照一定的条件进行分组，现在 JavaScript 支持静态方法 Object.groupBy() 和 Map.groupBy()",
  },
  {
    title: "尽情使用 AbortController（Don't Sleep on AbortController）",
    date: "2024 年 9 月 29 日",
    categories: ["#javascript"],
    content:
      "AbortController 是一个标准的 JavaScript API，当需要取消请求、移除事件监听器、中止流，或使任何逻辑程中止时，你都可以有效地利用 AbortController。",
  },
  {
    title: "React 19 更新精简纪要",
    date: "2024 年 9 月 26 日",
    categories: ["#react", "#javascript"],
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
      "嘉会医疗前端组负责开发医院及各科室的网站和终端嵌入应用，包括药物信息、药品信息、就医流程等内容。同我们开发和管理医院运行所需的系统，包科室管理、药物管理、医生信息、诊疗价格和健康知识等。我们的工作还涵盖优惠和保险系统的对接以及其他第三方服务的整合。",
  },
  {
    title: "高级前端工程师",
    company: "众安保险",
    date: "8月2020 - 7月2021",
    content:
      "该项目由众安保险公司提供，结了互联网保险和医疗服务，涵盖在线图文问诊、视频问诊、医生在线开处方以及患者在线购药。项目不仅与众安保险的健康险业务无缝集成，还支持与云闪付等不同渠道的对接。",
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

const router = useRouter();

function navigateToCategory() {
  router.push("/category");
}
</script>
<style scoped>
.item-outline {
  @apply mt-16 flex flex-col;
}
</style>
