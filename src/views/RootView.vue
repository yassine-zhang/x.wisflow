<template>
  <section>
    <header class="grid-background p-4 rounded-md">
      <p class="text-gray-600 dark:text-gray-400">济宁市若森软件开发中心</p>
      <h1 class="font-bold text-gray-800 dark:text-gray-200">
        {{ dataStore.profile.greeting }}
      </h1>
      <p class="mt-3 text-gray-600 dark:text-gray-400">
        {{ dataStore.profile.description }}
      </p>
      <p class="mt-2 text-gray-500 dark:text-gray-300 leading-6">
        {{ dataStore.profile.recordDate }}
      </p>
      <div ref="socialIconsParent" class="flex gap-2 mt-4">
        <a
          v-for="(icon, index) in dataStore.profile.socialIcons"
          :key="index"
          :href="icon.link"
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

      <div class="flex flex-wrap gap-2 sm:gap-4 mt-4">
        <CategoryItem
          v-for="(category, index) in dataStore.categories.slice(
            0,
            dataStore.sliceCounts.categories,
          )"
          :key="index"
          :data="category"
          :index="index"
          :allow-show-all="false"
          :class="index === 0 ? 'flex-2' : 'flex-1'"
        />
      </div>
    </section>

    <section class="item-outline">
      <header class="flex items-center justify-between mb-2">
        <h2 class="font-semibold text-gray-800 dark:text-gray-200">近期文章</h2>
        <RouterLink to="/category?type=list">
          <button
            class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-style"
          >
            全部文章
          </button>
        </RouterLink>
      </header>
      <ArticleItem
        v-for="(article, index) in dataStore.sortedArticles.slice(
          0,
          dataStore.sliceCounts.articles,
        )"
        class="my-4"
        :key="index"
        :data="article"
        :allow-show-all="true"
      />
    </section>

    <section class="item-outline">
      <header class="flex items-center justify-between mb-2">
        <h2 class="font-semibold text-gray-800 dark:text-gray-200">工作经验</h2>
        <RouterLink to="/work">
          <button
            class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-style"
          >
            工作历程
          </button>
        </RouterLink>
      </header>
      <ExperienceItem
        v-for="(experience, index) in dataStore.experiences.slice(
          0,
          dataStore.sliceCounts.experiences,
        )"
        class="my-4"
        :key="index"
        :title="experience.title"
        :company="experience.company"
        :date="experience.date"
        :content="experience.content"
      />
    </section>

    <section class="item-outline">
      <header class="flex items-center justify-between mb-2">
        <h2 class="font-semibold text-gray-800 dark:text-gray-200">近期项目</h2>
        <button
          class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-style"
          @click="navigateToProjects"
        >
          全部项目
        </button>
      </header>
      <ProjectItem
        v-for="(project, index) in dataStore.projects.slice(
          0,
          dataStore.sliceCounts.projects,
        )"
        class="my-4"
        :key="index"
        :title="project.title"
        :date="project.date"
        :content="project.content"
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
import { useDataStore } from "@/stores/useDataStore";

const socialIconsParent = ref<HTMLElement | null>(null);
const dataStore = useDataStore();

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

const router = useRouter();

function navigateToCategory() {
  router.push("/category?type=grid");
}

function navigateToProjects() {
  router.push("/projects");
}
</script>
<style scoped>
.item-outline {
  @apply mt-16 flex flex-col;
}

.grid-background {
  background-size: 14px 14px;
  background-image: linear-gradient(to right, #f6f6f6 1px, transparent 1px),
    linear-gradient(to bottom, #f6f6f6 1px, transparent 1px);
}

.dark .grid-background {
  background-image: linear-gradient(to right, #060f2c 1px, transparent 1px),
    linear-gradient(to bottom, #060f2c 1px, transparent 1px);
}
</style>
