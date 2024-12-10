<template>
  <div
    ref="rootElement"
    class="flex flex-col items-start"
    :style="{ marginBottom: remainingHeight + 'px' }"
  >
    <h1 class="text-2xl font-bold mb-4">Work工作历程</h1>
    <ExperienceItem
      v-for="(experience, index) in experiences"
      class="my-4"
      :key="index"
      :title="experience.title"
      :company="experience.company"
      :date="experience.date"
      :content="experience.content"
    />
    <CdButton></CdButton>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import CdButton from "@/components/CdButton.vue";
import { calculateRemainingHeight } from "@/utils/calculateRemainingHeight";
import ExperienceItem from "@/components/ExperienceItem.vue";

const remainingHeight = ref<number | undefined>(0);
const rootElement = ref<HTMLElement | null>(null);

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
  {
    title: "高级前端工程师",
    company: "易居中国",
    date: "6月2016 - 7月2020",
    content:
      "该项目为房地产企业提供项目投资数据服务，覆盖全国 90 多家领先房地产公司在 26 个城市的地产项目管理。主要功能包括企业项目管理和项目资产管理，涉及资产查询、市场监控、城市周边信息和宏观指标的数据分析与查询。我们设计并开发了相应的管理后台，确保其顺利交付使用。<br/><br/>在当前资产管理进入存量时代的背景下，该项目旨在帮助项目所有者实现资产的合理有效管理。项目提供经营数据分析、项目诊断和资产评估等服务，助力项目所有者优化资产管理。项目团队在立项后用四个月时间完成了主要流程和功能的开发。",
  },
]);

onMounted(() => {
  const rootHeight = rootElement.value?.offsetHeight || 0;
  remainingHeight.value = calculateRemainingHeight(248 + rootHeight);
});
</script>
