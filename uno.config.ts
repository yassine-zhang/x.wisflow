// uno.config.ts
import { defineConfig, transformerDirectives } from "unocss";
import presetUno from "@unocss/preset-uno";

export default defineConfig({
  presets: [presetUno()],
  shortcuts: {},
  transformers: [
    transformerDirectives({
      // the defaults
      applyVariable: ["--at-apply", "--uno-apply", "--uno"],
      // or disable with:
      // applyVariable: false
    }),
  ],
});
