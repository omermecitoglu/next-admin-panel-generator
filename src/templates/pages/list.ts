import { camelCase, capitalCase, kebabCase, pascalCase, snakeCase } from "~/core/string";
import getTemplate from "~/core/template";
import template from "./list.hbs";

type ResourceListPageTemplate = {
  subPath: string,
  i18n: boolean,
  camelCasePlural: string,
  capitalCasePlural: string,
  capitalCaseSingular: string,
  kebabCasePlural: string,
  pascalCasePlural: string,
  pascalCaseSingular: string,
  snakeCasePlural: string,
};

export default function generateResourceListPage(modelName: string, i18n: boolean, subPath: string) {
  while (subPath.startsWith("/")) {
    subPath = subPath.slice(1);
  }
  subPath = subPath.replace(/\([^)]*\)/g, "");
  if (subPath.length) {
    subPath = "/" + subPath;
  }
  return getTemplate<ResourceListPageTemplate>(template)({
    subPath,
    i18n,
    camelCasePlural: camelCase(modelName, true),
    capitalCasePlural: capitalCase(modelName, true, false),
    capitalCaseSingular: capitalCase(modelName, false, false),
    kebabCasePlural: kebabCase(modelName, true),
    pascalCasePlural: pascalCase(modelName, true),
    pascalCaseSingular: pascalCase(modelName, false),
    snakeCasePlural: snakeCase(modelName, true),
  });
}
