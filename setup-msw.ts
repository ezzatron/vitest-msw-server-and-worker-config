import { server as viServer } from "@vitest/browser/context";
import { setupServer, type SetupServer } from "msw/node";
import { setupWorker, type SetupWorker } from "msw/browser";
import { afterAll, beforeAll, beforeEach } from "vitest";

export function setupMSW(): SetupServer | SetupWorker {
  if (viServer) {
    const worker = setupWorker();

    beforeAll(async () => {
      await worker.start({
        quiet: true,
        onUnhandledRequest: "bypass",
      });
    });

    beforeEach(() => {
      worker.resetHandlers();
    });

    afterAll(() => {
      worker.stop();
    });

    return worker;
  }

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
