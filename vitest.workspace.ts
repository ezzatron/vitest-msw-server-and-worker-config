import { defineProject, defineWorkspace } from "vitest/config";

export default defineWorkspace([
  defineProject({
    resolve: {
      alias: [
        {
          find: "msw/node",
          replacement: "./dummy-msw.ts",
        },
        {
          find: "@mswjs/interceptors/ClientRequest",
          replacement: "./dummy-msw.ts",
        },
      ],
    },
    test: {
      name: "chromium",
      browser: {
        enabled: true,
        headless: true,
        provider: "playwright",
        name: "chromium",
      },
    },
  }),
  defineProject({
    resolve: {
      alias: [
        {
          find: "msw/browser",
          replacement: "./dummy-msw.ts",
        },
      ],
    },
    test: {
      name: "happy-dom",
      environment: "happy-dom",
    },
  }),
]);
