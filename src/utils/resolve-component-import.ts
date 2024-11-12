import type { App, Component } from "vue";

const componentsMap: Record<string, Component> = {};

/**
 * 解析并注册组件到应用实例中
 * 该函数遍历 componentsMap 对象中的每个键值对，并将其注册到应用实例 app 中
 * @param app - 应用实例
 * @returns {void} - 该函数不返回任何值
 */
export default function resolve(app: App<Element>) {
  for (const key in componentsMap) {
    app.component(key, componentsMap[key]);
  }
}
