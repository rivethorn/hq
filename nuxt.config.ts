// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/content",
    "@vite-pwa/nuxt",
    "nuxt-snow-effect",
  ],
  css: ["~/assets/css/main.css"],
  fonts: { local: {}, google: {} },
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
  pwa: {
    registerType: "autoUpdate",
    strategies: "generateSW",
    workbox: {
      globPatterns: ["**/*.{html,js,css}"],
      runtimeCaching: [],
      skipWaiting: true,
      clientsClaim: true,
      navigateFallback: "/",
      navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
    },
    manifest: {
      name: "Rivethorn's HQ",
      short_name: "Rivethorn's HQ",
      description: "Rivethorn's blogs and thoughts",
      theme_color: "#6e3300",
      background_color: "#090909",
      display: "standalone",
      scope: "/",
      start_url: "/",
      icons: [
        {
          src: "/pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/maskable-icon-512x512.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
      lang: "en_US",
      dir: "ltr",
    },
    pwaAssets: {
      config: true,
      overrideManifestIcons: true,
      preset: "minimal-2023",
    },
  },
});
