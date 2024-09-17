import { expect, it } from "vitest";
import { setupMSW } from "./setup-msw.js";
import { http, HttpResponse } from "msw";

// setupMSW is a helper function that calls setupServer or setupWorker based on
// whether the test is running under Vitest browser mode or not
const server = await setupMSW();

it("should respond to requests", async () => {
  server.use(
    http.get("/greet", ({ request }) => {
      const url = new URL(request.url);
      const name = url.searchParams.get("name") ?? "";

      return HttpResponse.json({ greeting: `Hello ${name}` });
    })
  );

  const response = await fetch("/greet?name=Vitest");

  expect(response.ok).toBe(true);
  expect(await response.json()).toEqual({ greeting: "Hello Vitest" });
});
