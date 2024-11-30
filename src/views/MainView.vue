<script setup lang="ts">
import { ref, onMounted } from "vue";
import packageJson from "../../package.json";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  <section
    class="flex flex-col gap-3 p-3 text-black sm:p-8"
    direction="vertical"
  >
    <h1 class="font-bold text-xl">MainView Starter Page</h1>
    <Alert class="w-full sm:w-[60%]">
      <AlertTitle>描述：</AlertTitle>
      <AlertDescription>
        基础Web模版，包含Vue3、Shadcn、Tailwind、TypeScript、ESLint、Prettier...
      </AlertDescription>
    </Alert>
    <pre class="whitespace-pre-wrap break-words text-sm font-normal">{{
      dependenciesString
    }}</pre>
  </section>
</template>
