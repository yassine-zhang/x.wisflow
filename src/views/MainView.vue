<script setup lang="ts">
import { Space as ASpace, message } from 'ant-design-vue'
import { ref, onMounted } from 'vue'
import packageJson from '../../package.json'

const dependenciesString = ref('')

onMounted(() => {
  message.success('Hello World')

  const formatDependencies = (deps: Record<string, string>) => {
    return Object.entries(deps)
      .map(([name, version]) => `  "${name}": "${version}"`)
      .join(',\n')
  }

  const dependencies = formatDependencies(packageJson.dependencies)
  const devDependencies = formatDependencies(packageJson.devDependencies)

  dependenciesString.value = `// package.json
"dependencies": {
${dependencies}
},
"devDependencies": {
${devDependencies}
},`
})
</script>

<template>
  <a-space class="p-8 <sm:p-3 text-blue-600" direction="vertical">
    <h1 class="font-bold text-xl">MainView Starter Page</h1>
    <pre class="whitespace-pre-wrap break-words text-sm font-normal">{{ dependenciesString }}</pre>
  </a-space>
</template>
