import path from "node:path";

export function getAdminRoutePath(srcDir: boolean, i18nRouting: boolean, subPath: string) {
  const directories = [];
  if (srcDir) {
    directories.push("src");
  }
  directories.push("app");
  if (i18nRouting) {
    directories.push("[locale]");
  }
  while (subPath.startsWith("/")) {
    subPath = subPath.slice(1);
  }
  directories.push(subPath);
  return path.resolve(process.cwd(), ...directories);
}
