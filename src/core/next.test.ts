import path from "node:path";
import { expect, test } from "vitest";
import { getAdminRoutePath } from "./next";

test("getAdminRoutePath", () => {
  const cwd = process.cwd();

  expect(getAdminRoutePath(true, false, "/admin")).toBe(path.resolve(cwd, "src/app/admin"));
  expect(getAdminRoutePath(true, true, "/admin")).toBe(path.resolve(cwd, "src/app/[locale]/admin"));
  expect(getAdminRoutePath(false, false, "/admin")).toBe(path.resolve(cwd, "app/admin"));
  expect(getAdminRoutePath(false, true, "/admin")).toBe(path.resolve(cwd, "app/[locale]/admin"));
});
