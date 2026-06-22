import { camelCase, capitalCase, kebabCase, pascalCase, snakeCase } from "~/core/string";
import render from "~/core/template";
import template from "./show.hbs";

type ShowResourcePageTemplate = {
  subPath: string,
  i18n: boolean,
  camelCaseSingular: string,
  capitalCaseSingular: string,
  kebabCasePlural: string,
  pascalCaseSingular: string,
  snakeCasePlural: string,
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
    subPath,
    i18n,
    camelCaseSingular: camelCase(modelName, false),
    capitalCaseSingular: capitalCase(modelName, false, false),
    kebabCasePlural: kebabCase(modelName, true),
    pascalCaseSingular: pascalCase(modelName, false),
    snakeCasePlural: snakeCase(modelName, true),
  });
}
