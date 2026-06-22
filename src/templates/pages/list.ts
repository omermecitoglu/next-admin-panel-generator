import render from "~/core/template";
import template from "./list.hbs";

type ResourceListPageTemplate = {
  modelName: string,
  subPath: string,
  i18n: boolean,
};

export default function generateResourceListPage(modelName: string, i18n: boolean, subPath: string) {
  while (subPath.startsWith("/")) {
    subPath = subPath.slice(1);
  }
  subPath = subPath.replace(/\([^)]*\)/g, "");
  if (subPath.length) {
    subPath = "/" + subPath;
  }
  return render<ResourceListPageTemplate>(template, {
    modelName,
    subPath,
    i18n,
  });
}
