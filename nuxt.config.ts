// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/ui", "@nuxt/content", "nuxt-llms"],
  css: ["~/assets/css/main.css"],
  fonts: { local: {}, google: {} },
  llms: {
    domain: "https://rivethorn.is-a.dev",
    title: "Rivethorn's HQ",
    description:
      "Thoughts and essays on programming and technology, like Vue.JS, Nuxt, and Rust",
  },
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ["ts", "js", "json", "vue", "rust", "python", "go", "yaml"],
          theme: {
            default: "gruvbox-dark-hard",
            dark: "gruvbox-dark-hard",
            light: "gruvbox-light-hard",
          },
        },
        toc: { depth: 3 },
      },
    },
  },
  colorMode: {
    preference: "system",
    fallback: "dark",
  },
  app: {
    head: {
      title: "Rivethorn's HQ",
      htmlAttrs: {
        dir: "ltr",
        lang: "en_US",
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
      routes: ["/rss.xml"],
      crawlLinks: true,
    },
  },
  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: "remove",
      },
    },
  },
});
