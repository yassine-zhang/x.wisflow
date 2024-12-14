import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  Profile,
  Category,
  Article,
  Experience,
  Project,
  SliceCounts,
} from "../types/dataTypes";
import dayjs from "dayjs";

export const useDataStore = defineStore("dataStore", () => {
  const profile = ref<Profile>({
    name: "张永鑫",
    greeting: "Hi, I'm 张永鑫 👋",
    description:
      "Vue3 + TypeScript + Bun 全栈开发工程师，<br/>热爱前沿 AI 技术，享受AI赋能带来的便利。日常生活中，我喜欢骑单车 🚴、健身🏋️。",
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
      name: "enterprise-solution",
      description: "实际开发业务中有用的新型前沿技术解决方案",
      views: 4078,
      articleCount: 4,
      free: false,
      words: 0,
    },
    {
      title: "DevOps 开发运维",
      name: "dev-ops",
      description: "记录运维开发中遇到的问题和解决方案",
      views: 739,
      articleCount: 1,
      free: true,
      words: 0,
    },
    {
      title: "CSS 学习",
      name: "css-study",
      description: "记录 CSS 学习笔记",
      views: 391,
      articleCount: 2,
      free: true,
      words: 0,
    },
  ]);

  const articles = ref<Article[]>([
    {
      title: "第zero期、当前专栏涉及技术要点",
      date: "2024-08-10 12:45:39",
      categories: ["Web全栈开发-企业解决方案"],
      content:
        "在查阅本专栏期刊之前，我强烈建议您有必要了解以下技术栈，以充分理解讲解内容意图，如有不明之处请加我好友咨询（备注来意）",
      free: false,
      slug: "zero-technical-point",
      prefix: "enterprise-solution",
      path: "/src/content/enterprise-solution/zero-technical-point.md",
      words: 628,
    },
    {
      title: "第一期、使用GPT-SoVITS从训练数据到推理使用",
      date: "2024-07-11 08:21:06",
      categories: ["Web全栈开发-企业解决方案"],
      content:
        "GPT-SoVITS 是一种基于 AI 技术的工具，要应用于 语音转换（Voice Conversion, VC） 场景。具体来说，它结合了 GPT 的文本处理能力和 SoVITS（Soft Voice Identity Transfer System） 的语音转换技术，用于高质量的语音合成和特定声音风格的转换。",
      free: false,
      slug: "gpt-sovits-from-training-to-inference",
      prefix: "enterprise-solution",
      path: "/src/content/enterprise-solution/gpt-sovits-from-training-to-inference.md",
      words: 3965,
    },
    {
      title: "第五期、Docker Registry私有仓库攻略",
      date: "2024-08-02 07:14:26",
      categories: ["Web全栈开发-企业解决方案"],
      content:
        "在日常使用 Docker 构建、推送、拉取镜像的时候为了隐私以及安全性考虑我们通常会在服务器上部署 registry 镜像容器，它拥有 dockerhub 的基础仓库服务功能。",
      free: false,
      slug: "docker-registry-private-repository-strategy",
      prefix: "enterprise-solution",
      path: "/src/content/enterprise-solution/docker-registry-private-repository-strategy.md",
      words: 3321,
    },
    {
      title: "第七期：Nginx反向代理HTTPS API服务",
      date: "2024-08-14 09:14:51",
      categories: ["Web全栈开发-企业解决方案"],
      content: "稍微与http反代有点不一样的点，你值得学习！",
      free: false,
      slug: "nginx-reverse-proxy-https-api-service",
      prefix: "enterprise-solution",
      path: "/src/content/enterprise-solution/nginx-reverse-proxy-https-api-service.md",
      words: 2446,
    },
    {
      title: "git commit 规则",
      date: "2024-12-09 13:37:59",
      categories: ["DevOps 开发运维"],
      content:
        "如下图所示，是我推送到 github 的信息，当提交的信息过于细碎时可以按照这个格式写。",
      free: true,
      slug: "git-commit-rules",
      prefix: "dev-ops",
      path: "/src/content/dev-ops/git-commit-rules.md",
      words: 602,
    },
    {
      title: "网格背景应用",
      date: "2024-12-07 09:58:26",
      categories: ["CSS 学习"],
      content:
        "在 Even You 创业公司的网站 voidzero 中看到的网格平铺背景的实现思路。",
      free: true,
      slug: "grid-background-application",
      prefix: "css-study",
      path: "/src/content/css-study/grid-background-application.md",
      words: 269,
    },
    {
      title: "线性渐变背景与文字应用",
      date: "2024-11-18 18:51:69",
      categories: ["CSS 学习"],
      content: "linear-gradient 高级感指南",
      free: true,
      slug: "linear-gradient-background-and-text-application",
      prefix: "css-study",
      path: "/src/content/css-study/linear-gradient-background-and-text-application.md",
      words: 538,
    },
  ]);

  const sortedArticles = ref<Article[]>([]);

  function sortArticlesByDate() {
    sortedArticles.value = articles.value.sort(
      (a, b) => dayjs(b.date).unix() - dayjs(a.date).unix(),
    );
  }

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
        "该项目由众安保险公司提供，结了互联网保险和医疗服务，涵盖在线图文问诊、视频问诊、医��在线开处方以及患者在线购药。项目不仅与众安保险的健康险业务无缝集成，还支持与云闪付等不同渠道的对。",
    },
    {
      title: "高级前端工程师",
      company: "易居中国",
      date: "6月2016 - 7月2020",
      content:
        "该项目为房地产企业提供项目投资数据服务，覆盖全国 90 多家领先房地产公司在 26 个城市的地产项目管理。主要功能包括企业项目管理和项目资产管理，涉及地产查询、市场监控、城市周边信息和宏观指标的数据分析与查询。我们设计并开发了相应的管理后台，确保其顺利交付使用。<br/><br/>在当前资产管理进入存量时代的背景下，该项目旨在帮助项目所有者实现资产的合理有效管理。项目提供经营数据分析、项目诊断和资产评估等服务，助力项目所有者优化资产管理。项目团队在立项后用四个月时间完成了主要流程和功能的开发。",
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

  const sliceCounts = ref<SliceCounts>({
    categories: 5,
    articles: 5,
    experiences: 2,
    projects: 2,
  });

  function findArticleData(prefix: string, slug: string): Article | undefined {
    const article = articles.value.find(
      (article) => article.prefix === prefix && article.slug === slug,
    );
    return article;
  }

  function filterArticlesByCategory(categoryName: string) {
    return articles.value.filter((article) => article.prefix === categoryName);
  }

  function findCategoryByName(name: string): Category | undefined {
    return categories.value.find((category) => category.name === name);
  }

  function findCategoryByTitle(title: string): Category | undefined {
    return categories.value.find((category) => category.title === title);
  }

  function calculateWordsInCategories() {
    categories.value.forEach((category) => {
      const totalWords = articles.value
        .filter((article) => article.prefix === category.name)
        .reduce((sum, article) => sum + article.words, 0);
      category.words = totalWords; // 更新对应类别的 words
    });
  }

  return {
    profile,
    categories,
    articles,
    sortedArticles,
    experiences,
    projects,
    sliceCounts,
    findArticleData,
    sortArticlesByDate,
    filterArticlesByCategory,
    findCategoryByName,
    findCategoryByTitle,
    calculateWordsInCategories,
  };
});
