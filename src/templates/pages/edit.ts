import { camelCase, capitalCase, kebabCase, pascalCase } from "~/core/string";
import render from "~/core/template";
import template from "./edit.hbs";

type EditResourcePageTemplate = {
  subPath: string,
  i18n: boolean,
  camelCaseSingular: string,
  capitalCaseSingular: string,
  kebabCaseSingular: string,
  kebabCasePlural: string,
  pascalCaseSingular: string,
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
    subPath,
    i18n,
    camelCaseSingular: camelCase(modelName, false),
    capitalCaseSingular: capitalCase(modelName, false, false),
    kebabCasePlural: kebabCase(modelName, true),
    kebabCaseSingular: kebabCase(modelName, false),
    pascalCaseSingular: pascalCase(modelName, false),
  });
}
