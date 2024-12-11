import { defineStore } from "pinia";
import { ref } from "vue";

export const useDataStore = defineStore("dataStore", () => {
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

  const categories = ref([
    {
      title: "物联网技能大赛知识预览",
      description: "了解技能大赛笔记入口",
      views: 4078,
      articleCount: 15,
      free: true,
    },
    {
      title: "Element Plus 组件库学习",
      description: "基于 Vue 3，面向设计师和开发者的组件库",
      views: 41,
      articleCount: 20,
      free: true,
    },
    {
      title: "Web全栈开发-企业解决方案",
      description:
        "在阅本专栏期刊之前，我强烈建议您有必要了解以下技术栈，以充分理解讲解内容意图，如有不明之处请加我好友咨询（备注来意）",
      views: 9637,
      articleCount: 5,
      free: false,
    },
  ]);

  const articles = ref([
    {
      title: "JavaScript 对分组方法 `Object.groupBy()` 和 `Map.groupBy()`",
      date: "2024 年 10 月 12 日",
      categories: ["物联网技能大赛知识预览"],
      content:
        "在日常开发中我们经常需要对数组和类数组等可迭代对象按照一定的条件进行分组，现在 JavaScript 支持静态方法 Object.groupBy() 和 Map.groupBy()",
      free: true,
      slug: "javascript-groupby",
    },
    {
      title: "尽情使用 AbortController（Don't Sleep on AbortController）",
      date: "2024 年 9 月 29 日",
      categories: ["Web全栈开发-企业解决方案"],
      content:
        "AbortController 是一个标准的 JavaScript API，当需要取消请求、移除事件监听器、中止流，或使任何逻辑程中止时，你都可以有效地利用 AbortController。",
      free: false,
      slug: "abortcontroller",
    },
    {
      title: "React 19 更新精简纪要",
      date: "2024 年 9 月 26 日",
      categories: ["Element Plus 组件库学习"],
      content:
        "最近知名的 React 开发者 Kent C. Dodds 发表一页 React 19 的功能更新纪要，精简到一页 PDF。",
      free: true,
      slug: "react-19-update-summary",
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
    {
      title: "高级前端工程师",
      company: "易居中国",
      date: "6月2016 - 7月2020",
      content:
        "该项目为房地产企业提供项目投资数据服务，覆盖全国 90 多家领先房地产公司在 26 个城市的地产项目管理。主要功能包括企业项目管理和项目资产管理，涉及资产查询、市场监控、城市周边信息和宏观指标的数据分析与查询。我们设计并开发了相应的管理后台，确保其顺利交付使用。<br/><br/>在当前资产管理进入存量时代的背景下，该项目旨在帮助项目所有者实现资产的合理有效管理。项目提供经营数据分析、项目诊断和资产评估等服务，助力项目所有者优化资产管理。项目团队在立项后用四个月时间完成了主要流程和功能的开发。",
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

  return { profile, categories, articles, experiences, projects };
});
