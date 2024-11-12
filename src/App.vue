<script setup lang="ts"></script>

<template>
  <ant-config-provider
    :theme="{
      token: {
        fontFamily:
          'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
      },
    }"
  >
    <RouterView class="gt-standard" />
  </ant-config-provider>
</template>
