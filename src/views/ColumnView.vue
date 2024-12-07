<template>
  <div
    ref="rootElement"
    :style="{ marginBottom: remainingHeight + 'px' }"
    class="flex flex-col items-start"
  >
    <h1 class="text-2xl font-semibold mb-2">专栏分类</h1>
    <p class="text-gray-500 dark:text-gray-400">
      专栏对文章进行了分类，方便你快速找到感兴趣的内容。
    </p>
    <div class="w-full flex justify-between mt-8">
      <div class="flex items-center gap-2">
        <span class="w-40">专栏筛选：</span>
        <Select default-value="free">
          <SelectTrigger>
            <SelectValue placeholder="选择专栏类别" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="free"> 免费 </SelectItem>
              <SelectItem value="pay"> 付费 </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div class="flex items-center gap-2">
        <Icon
          class="cursor-pointer text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white transition-style"
          icon="tabler:layout-grid"
          width="22"
          height="22"
        />
        <Icon
          class="cursor-pointer text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white transition-style"
          icon="tabler:list"
          width="26"
          height="26"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mt-6">
      <div
        class="cursor-pointer rounded-lg border-dashed border-2 border-gray-300 dark:border-gray-500 hover:border-black dark:hover:border-white flex flex-col items-center justify-center p-4 transition-style"
      >
        <Icon icon="mi:add" width="24" height="24" />
        <span class="text-sm">新建专栏</span>
      </div>

      <ColumnItem
        v-for="(column, index) in columns"
        :key="index"
        :column="column"
        :index="index"
      />
    </div>

    <CdButton />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { calculateRemainingHeight } from "@/utils/calculateRemainingHeight";
import CdButton from "@/components/CdButton.vue";
import { Icon } from "@iconify/vue";
import ColumnItem from "@/components/ColumnItem.vue";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const remainingHeight = ref<number | undefined>(0);
const rootElement = ref<HTMLElement | null>(null);

const columns = ref([
  {
    title: "物联网技能大赛知识预览",
    description: "了解技能大赛笔记入口",
    views: 4078,
    articleCount: 15,
  },
  {
    title: "Element Plus 组件库学习",
    description: "基于 Vue 3，面向设计师和开发者的组件库",
    views: 41,
    articleCount: 10,
  },
  {
    title: "Web全栈开发-企业解决方案",
    description:
      "在阅本专栏期刊之前，我强烈建议您有必要了解以下技术栈，以充分理解讲解内容意图，如有不明之处请加我好友咨询（备注来意）",
    views: 9637,
    articleCount: 20,
  },
]);

onMounted(() => {
  const rootHeight = rootElement.value?.offsetHeight || 0;
  remainingHeight.value = calculateRemainingHeight(248 + rootHeight);
});
</script>
