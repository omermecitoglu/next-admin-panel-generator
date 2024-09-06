import path from "node:path";

export function getAdminRoutePath(srcDir: boolean, i18nRouting: boolean) {
  const directories = [];
  if (srcDir) {
    directories.push("src");
  }
  directories.push("app");
  if (i18nRouting) {
    directories.push("[locale]");
  }
  directories.push("admin");
  return path.resolve(process.cwd(), ...directories);
}
