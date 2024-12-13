<template>
  <article
    :class="
      allowShowAll
        ? ''
        : 'flex justify-between flex-col sm:flex-row items-start sm:items-center'
    "
  >
    <h3 class="font-medium text-gray-800 dark:text-gray-200">
      <RouterLink
        :to="`/blog/${data.prefix}/${data.slug}`"
        class="underline-style"
      >
        {{ data.title }}
      </RouterLink>
    </h3>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
      {{ dayjs(data.date).format("YYYY 年 MM 月 DD 日") }}
      <span v-if="data.categories.length > 0 && allowShowAll">
        <span
          v-for="(category, categoryIndex) in data.categories"
          class="mx-1 text-gray-500 dark:text-gray-400"
          :key="categoryIndex"
        >
          <RouterLink :to="`/category/${category}`">
            <Badge :variant="data.free ? 'secondary' : 'default'">
              {{ category }}
            </Badge>
          </RouterLink>
        </span>
      </span>
    </p>
    <p
      v-if="data.content && allowShowAll"
      class="mt-4 text-gray-600 dark:text-gray-400"
    >
      {{ data.content }}
    </p>
  </article>
</template>
<script lang="ts" setup>
import { Badge } from "@/components/ui/badge";
import { RouterLink } from "vue-router";
import type { Article } from "@/types/dataTypes";
import dayjs from "dayjs";

const props = defineProps<{
  data: Article;
  allowShowAll: boolean;
}>();
</script>
