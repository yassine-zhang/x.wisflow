<script setup lang="ts">
import Header from "@/components/fixed/HeaderIndex.vue";
import Footer from "@/components/fixed/FooterIndex.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
import ProgressBar from "@/components/ui/ProgressBar.vue";
import { useProgressStore } from "@/stores/progress";

const progressStore = useProgressStore();
</script>

<template>
  <section class="w-full shadow-sm mb-16">
    <ProgressBar :progress="progressStore.progressValue" :allow-hide="true" />
    <Header class="wrapper-row" />
  </section>
  <section class="wrapper">
    <RouterView class="gt-standard" v-motion-fade />
    <Footer />
  </section>

  <Toaster />
</template>

<style scoped>
.wrapper {
  @apply flex flex-col max-w-3xl mx-auto px-4;
}

.wrapper-row {
  @apply max-w-3xl mx-auto px-4;
}
</style>
