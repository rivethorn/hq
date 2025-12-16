// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/ui", "@nuxt/content"],
  css: ["~/assets/css/main.css"],
  fonts: { local: {}, google: {} },
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ["ts", "js", "json", "vue", "rust", "python", "yaml"],
          theme: {
            light: "gruvbox-light-hard",
            dark: "gruvbox-dark-hard",
            default: "gruvbox-dark-hard",
          },
        },
      },
    },
  },
  app: {
    baseURL: "/hq/",
    head: {
      title: "Rivethorn's HQ",
      htmlAttrs: {
        dir: "ltr",
        lang: "en_US",
      },
      base: {
        target: "_blank",
      },
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
        },
        {
          name: "mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "default",
        },
        {
          name: "apple-mobile-web-app-title",
          content: "Rivethorn's HQ",
        },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          href: "/logo.png",
        },
      ],
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["vue", "vue-router"],
          },
        },
      },
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
});
