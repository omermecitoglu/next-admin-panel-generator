import render from "~/core/template";
import template from "./list.hbs";

type ListComponentTemplate = {
  modelName: string,
  subPath: string,
  i18n: boolean,
};

export default function generateListComponent(modelName: string, i18n: boolean, subPath: string) {
  while (subPath.startsWith("/")) {
    subPath = subPath.slice(1);
  }
  subPath = subPath.replace(/\([^)]*\)/g, "");
  if (subPath.length) {
    subPath = "/" + subPath;
  }
  return render<ListComponentTemplate>(template, {
    modelName,
    subPath,
    i18n,
  });
}
