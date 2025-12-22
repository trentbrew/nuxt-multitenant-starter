import tailwindcss from "@tailwindcss/vite";

import { routeValidator } from "./vite-plugins/route-validator";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  devServer: { port: 4567 },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "motion-v/nuxt",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "nuxt-og-image",
    "@nuxt/test-utils/module",
    "@yuta-inoue-ph/nuxt-vcalendar",
    "@vee-validate/nuxt",
    "vue-sonner/nuxt",
  ],

  imports: {
    imports: [
      { from: "tailwind-variants", name: "tv" },
      { from: "tailwind-variants", name: "VariantProps", type: true },
      {
        from: "vue-sonner",
        name: "toast",
        as: "useSonner",
      },
    ],
  },

  site: {
    url: process.env.PUBLIC_URL || "https://markform.app/",
    name: "Markform",
  },

  colorMode: { classSuffix: "", storageKey: "ui-thing-starter-color-mode" },

  icon: {
    clientBundle: { scan: true, sizeLimitKb: 0 },
    mode: "svg",
    class: "shrink-0",
    fetchTimeout: 2000,
    serverBundle: "local",
  },

  css: ["~/assets/css/tailwind.css"],

  vite: {
    plugins: [tailwindcss(), routeValidator()],
  },

  app: {
    head: {
      titleTemplate: "%s | Markform",
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.12/pdfmake.min.js",
          defer: true,
        },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.12/vfs_fonts.min.js",
          defer: true,
        },
      ],
    },
  },

  routeRules: {
    "/": { redirect: "/forms/feed" },
    "/activity": { redirect: "/activity/feed" },
    "/settings": { redirect: "/settings/project" },
    "/layouts": { redirect: "/layouts/playground" },
  },
});
