import render from "~/core/template";
import template from "./show.hbs";

type ShowResourcePageTemplate = {
  modelName: string,
  subPath: string,
  i18n: boolean,
};

export default function generateShowResourcePage(modelName: string, i18n: boolean, subPath: string) {
  while (subPath.startsWith("/")) {
    subPath = subPath.slice(1);
  }
  subPath = subPath.replace(/\([^)]*\)/g, "");
  if (subPath.length) {
    subPath = "/" + subPath;
  }
  return render<ShowResourcePageTemplate>(template, {
    modelName,
    subPath,
    i18n,
  });
}
