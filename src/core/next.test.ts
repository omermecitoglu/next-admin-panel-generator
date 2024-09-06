import path from "node:path";
import { expect, test } from "@jest/globals";
import { getAdminRoutePath } from "./next";

test("getAdminRoutePath", () => {
  const cwd = process.cwd();

  expect(getAdminRoutePath(true, false)).toBe(path.resolve(cwd, "src/app/admin"));
  expect(getAdminRoutePath(true, true)).toBe(path.resolve(cwd, "src/app/[locale]/admin"));
  expect(getAdminRoutePath(false, false)).toBe(path.resolve(cwd, "app/admin"));
  expect(getAdminRoutePath(false, true)).toBe(path.resolve(cwd, "app/[locale]/admin"));
});
