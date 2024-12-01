<script setup lang="ts">
import Header from "@/components/fixed/HeaderIndex.vue";
import Footer from "@/components/fixed/FooterIndex.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>

<template>
  <section class="w-full shadow-sm mb-16">
    <Header class="wrapper-row" />
  </section>
  <section class="wrapper">
    <RouterView class="gt-standard" />
    <Footer />
  </section>

  <Toaster />
</template>

<style scoped>
.wrapper {
  @apply flex flex-col gap-8 max-w-3xl mx-auto px-4;
}

.wrapper-row {
  @apply flex flex-row gap-8 max-w-3xl mx-auto px-4;
}
</style>
