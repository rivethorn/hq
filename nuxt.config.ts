// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/ui", "@nuxt/content", "@vite-pwa/nuxt"],
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
  colorMode: {
    preference: "dark",
    fallback: "dark",
  },
  app: {
    // baseURL: "/hq/",
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
  pwa: {
    registerType: "autoUpdate",
    strategies: "generateSW",
    workbox: {
      // Minimal precaching - just the HTML files needed for installation
      globPatterns: ["**/*.{html,js,css}"],
      // Don't cache anything else - always require network
      runtimeCaching: [],
      // Skip waiting and claim clients immediately
      skipWaiting: true,
      clientsClaim: true,
      // Use network-first for navigation
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
          src: "/logo.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/logo.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/logo.png",
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
      overrideManifestIcons: false,
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
});
