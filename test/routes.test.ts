import { describe, expect, it } from "vitest";
import { matchRoutes } from "react-router-dom";
import { routes } from "../src/routes";

describe("route table", () => {
  it("resolves a public page URL", () => {
    expect(matchRoutes(routes, "/about")).not.toBeNull();
  });

  it("does not resolve the Services URL while Services is Hidden", () => {
    expect(matchRoutes(routes, "/services")).toBeNull();
  });
});
