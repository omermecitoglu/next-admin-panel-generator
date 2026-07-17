import render from "~/core/template";
import template from "./create.hbs?raw";

type CreateResourcePageTemplate = {
  modelName: string,
  subPath: string,
  i18n: boolean,
};

export default function generateCreateResourcePage(modelName: string, i18n: boolean, subPath: string) {
  while (subPath.startsWith("/")) {
    subPath = subPath.slice(1);
  }
  subPath = subPath.replace(/\([^)]*\)/g, "");
  if (subPath.length) {
    subPath = "/" + subPath;
  }
  return render<CreateResourcePageTemplate>(template, {
    modelName,
    subPath,
    i18n,
  });
}
