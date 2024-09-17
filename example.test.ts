import { expect, it } from "vitest";
import { setupMSW } from "./setup-msw.js";
import { http, HttpResponse } from "msw";

const server = setupMSW();

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
