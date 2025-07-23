import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jsx,json,jpg,jpeg,webp}']
      },
      includeAssets: ['favicon.png', 'logo_192.png', 'logo.png'],
      manifest: {
        name: "Menufy",
        short_name: "Menufy",
        description: "Manage Your Restaurant, Cafe, Hotel, Bar, Food Truck, Stall, any food store.",
        theme_color: "#ECF1EB",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/logo_192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable any"
          },
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any"
          },
        ],
        // Screenshots pour PC seulement
        screenshots: [
          {
            src: "/devices/screenshot-desktop1.png",
            sizes: "1920x1080",
            type: "image/png",
            form_factor: "wide",
            label: "Tableau de bord Menufy"
          },
          {
            src: "/devices/screenshot-desktop1.png",
            sizes: "1920x1080",
            type: "image/png",
            form_factor: "wide",
            label: "Gestion des menus"
          },
          {
            src: "/devices/screenshot-desktop1.png",
            sizes: "1920x1080",
            type: "image/png",
            form_factor: "wide",
            label: "Interface de commandes"
          },
          // Screenshots mobile
          {
            src: "/devices/mobile/screenshot-mobile1.png",
            sizes: "390x844",
            type: "image/png",
            form_factor: "narrow",
            label: "Mobile 1"
          },
          {
            src: "/devices/mobile/screenshot-mobile2.png",
            sizes: "390x844",
            type: "image/png",
            form_factor: "narrow",
            label: "Mobile 2"
          },
          {
            src: "/devices/mobile/screenshot-mobile3.png",
            sizes: "390x844",
            type: "image/png",
            form_factor: "narrow",
            label: "Mobile 3"
          },
          {
            src: "/devices/mobile/screenshot-mobile4.png",
            sizes: "390x844",
            type: "image/png",
            form_factor: "narrow",
            label: "Mobile 4"
          },
          {
            src: "/devices/mobile/screenshot-mobile5.png",
            sizes: "390x844",
            type: "image/png",
            form_factor: "narrow",
            label: "Mobile 5"
          },
          {
            src: "/devices/mobile/screenshot-mobile6.png",
            sizes: "390x844",
            type: "image/png",
            form_factor: "narrow",
            label: "Mobile 6"
          },
          {
            src: "/devices/mobile/screenshot-mobile7.png",
            sizes: "390x844",
            type: "image/png",
            form_factor: "narrow",
            label: "Mobile 7"
          },
          {
            src: "/devices/mobile/screenshot-mobile8.png",
            sizes: "390x844",
            type: "image/png",
            form_factor: "narrow",
            label: "Mobile 8"
          },
          {
            src: "/devices/mobile/screenshot-mobile9.png",
            sizes: "390x844",
            type: "image/png",
            form_factor: "narrow",
            label: "Mobile 9"
          },
          {
            src: "/devices/mobile/screenshot-mobile10.png",
            sizes: "390x844",
            type: "image/png",
            form_factor: "narrow",
            label: "Mobile 10"
          },
          {
            src: "/devices/mobile/screenshot-mobile11.png",
            sizes: "390x844",
            type: "image/png",
            form_factor: "narrow",
            label: "Mobile 11"
          }
        ]
      },
      prompt: true,
      promptForUpdate: true,
    }),
  ],
});