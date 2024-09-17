import { server as viServer } from "@vitest/browser/context";
import type { SetupServer } from "msw/node";
import type { SetupWorker } from "msw/browser";
import { afterAll, beforeAll, beforeEach } from "vitest";

export async function setupMSW(): Promise<SetupServer | SetupWorker> {
  // If this is defined, we are running under Vitest browser mode
  if (viServer) {
    const { setupWorker } = await import("msw/browser");
    const worker = setupWorker();

    beforeAll(async () => {
      await worker.start({ quiet: true });
    });

    beforeEach(() => {
      worker.resetHandlers();
    });

    afterAll(() => {
      worker.stop();
    });

    return worker;
  }

  // Otherwise, we are running under Node.js
  const { setupServer } = await import("msw/node");
  const server = setupServer();

  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  return server;
}
