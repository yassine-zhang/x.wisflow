import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  Profile,
  Category,
  Article,
  Experience,
  Project,
} from "../types/dataTypes";

export const useDataStore = defineStore("dataStore", () => {
  const profile = ref<Profile>({
    name: "张永鑫",
    greeting: "Hi, I'm 张永鑫 👋",
    description:
      "NodeJS/Bun 全栈开发工程师，热爱前沿 AI 技术。日常生活中，我喜欢骑单车 🚴、健身🏋️。",
    recordDate: "2024 年 12 月 11 日，记录 x.wisflow.cn。",
    socialIcons: [
      {
        icon: "ri:bilibili-fill",
        color: "text-pink-500",
        link: "https://space.bilibili.com/3493138205247599",
      },
      {
        icon: "mdi:github",
        color: "text-gray-800 dark:text-gray-200",
        link: "https://github.com/yassine-zhang",
      },
      { icon: "mdi:email", color: "text-red-500", link: "mailto:hi@itcox.cn" },
    ],
  });

  const categories = ref<Category[]>([
    {
      title: "Web全栈开发-企业解决方案",
      description: "实际开发业务中有用的新型前沿技术解决方案",
      views: 4078,
      articleCount: 4,
      free: false,
    },
    {
      title: "DevOps 开发运维",
      description: "记录运维开发中遇到的问题和解决方案",
      views: 739,
      articleCount: 1,
      free: true,
    },
    {
      title: "CSS 学习",
      description: "记录 CSS 学习笔记",
      views: 391,
      articleCount: 2,
      free: true,
    },
  ]);

  const articles = ref<Article[]>([
    {
      title: "第zero期、当前专栏涉及技术要点",
      date: "2024 年 8 月 10 日",
      categories: ["Web全栈开发-企业解决方案"],
      content:
        "在查阅本专栏期刊之前，我强烈建议您有必要了解以下技术栈，以充分理解讲解内容意图，如有不明之处请加我好友咨询（备注来意）",
      free: false,
      slug: "zero-technical-point",
      prefix: "enterprise-solution",
      path: "/src/content/enterprise-solution/zero-technical-point.md",
    },
    {
      title: "第一期、使用GPT-SoVITS从训练数据到推理使用",
      date: "2024 年 7 月 11 日",
      categories: ["Web全栈开发-企业解决方案"],
      content:
        "GPT-SoVITS 是一种基于 AI 技术的工具，主要应用于 语音转换（Voice Conversion, VC） 场景。具体来说，它结合了 GPT 的文本处理能力和 SoVITS（Soft Voice Identity Transfer System） 的语音转换技术，用于高质量的语音合成和特定声音风格的转换。",
      free: false,
      slug: "gpt-sovits-from-training-to-inference",
      prefix: "enterprise-solution",
      path: "/src/content/enterprise-solution/gpt-sovits-from-training-to-inference.md",
    },
  ]);

  const experiences = ref<Experience[]>([
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
        "该项目为房地产企业提供项目投资数据服务，覆盖全国 90 多家领先房地产公司在 26 个城市的地产项目管理。主要功能包括企业项目管理和项目资产管理，涉及���产查询、市场监控、城市周边信息和宏观指标的数据分析与查询。我们设计并开发了相应的管理后台，确保其顺利交付使用。<br/><br/>在当前资产管理进入存量时代的背景下，该项目旨在帮助项目所有者实现资产的合理有效管理。项目提供经营数据分析、项目诊断和资产评估等服务，助力项目所有者优化资产管理。项目团队在立项后用四个月时间完成了主要流程和功能的开发。",
    },
  ]);

  const projects = ref<Project[]>([
    {
      title: "qrcode.vue",
      date: "2024 年 8 月 22 日",
      content:
        "A Vue.js component to generate qrcode. Supports both Vue 2 and Vue 3. 一款同时支持 Vue 2 和 Vue 3 的二维码组件。",
    },
  ]);

  return { profile, categories, articles, experiences, projects };
});
