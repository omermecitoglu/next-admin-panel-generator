import render from "~/core/template";
import template from "./edit.hbs";

type EditResourcePageTemplate = {
  modelName: string,
  subPath: string,
  i18n: boolean,
};

export default function generateEditResourcePage(modelName: string, i18n: boolean, subPath: string) {
  while (subPath.startsWith("/")) {
    subPath = subPath.slice(1);
  }
  subPath = subPath.replace(/\([^)]*\)/g, "");
  if (subPath.length) {
    subPath = "/" + subPath;
  }
  return render<EditResourcePageTemplate>(template, {
    modelName,
    subPath,
    i18n,
  });
}
