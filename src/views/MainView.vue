<script setup lang="ts">
import { ref, onMounted } from "vue";
import packageJson from "../../package.json";

const dependenciesString = ref("");

onMounted(() => {
  const formatDependencies = (deps: Record<string, string>) => {
    return Object.entries(deps)
      .map(([name, version]) => `  "${name}": "${version}"`)
      .join(",\n");
  };

  const dependencies = formatDependencies(packageJson.dependencies);
  const devDependencies = formatDependencies(packageJson.devDependencies);

  dependenciesString.value = `// package.json
"dependencies": {
${dependencies}
},
"devDependencies": {
${devDependencies}
},`;
});
</script>

<template>
  <ant-space class="p-8 <sm:p-3 text-black" direction="vertical">
    <h1 class="font-bold text-xl">MainView Starter Page</h1>
    <p>
      <strong>描述：</strong>
      基础Web模版，包含Vue3、AntDesignVue、Unocss、TypeScript、ESLint、Prettier...
    </p>
    <pre class="whitespace-pre-wrap break-words text-sm font-normal">{{
      dependenciesString
    }}</pre>
  </ant-space>
</template>
