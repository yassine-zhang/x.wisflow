// 定义 Profile 类型
export interface Profile {
  name: string;
  greeting: string;
  description: string;
  recordDate: string;
  socialIcons: SocialIcon[];
}

// 定义 SocialIcon 类型
export interface SocialIcon {
  icon: string;
  color: string;
  link: string;
}

// 定义 Category 类型
export interface Category {
  title: string;
  description: string;
  views: number;
  articleCount: number;
  free: boolean;
}

// 定义 Article 类型
export interface Article {
  title: string;
  date: string;
  categories: string[];
  content: string;
  free: boolean;
  slug: string;
  prefix: string;
  path: string;
}

// 定义 Experience 类型
export interface Experience {
  title: string;
  company: string;
  date: string;
  content: string;
}

// 定义 Project 类型
export interface Project {
  title: string;
  date: string;
  content: string;
}

// 定义 SliceCounts 类型
export interface SliceCounts {
  categories: number;
  articles: number;
  experiences: number;
  projects: number;
}
