import { camelCase, capitalCase, kebabCase, pascalCase } from "~/core/string";
import getTemplate from "~/core/template";
import handleBarsTemplate from "./list.hbs";

type ResourceListPageTemplate = {
  i18n: boolean,
  camelCasePlural: string,
  capitalCasePlural: string,
  capitalCaseSingular: string,
  kebabCasePlural: string,
  pascalCasePlural: string,
  pascalCaseSingular: string,
};

export default function generateResourceListPage(modelName: string, i18n: boolean) {
  const template = getTemplate<ResourceListPageTemplate>(handleBarsTemplate);
  return template({
    i18n,
    camelCasePlural: camelCase(modelName, true),
    capitalCasePlural: capitalCase(modelName, true, false),
    capitalCaseSingular: capitalCase(modelName, false, false),
    kebabCasePlural: kebabCase(modelName, true),
    pascalCasePlural: pascalCase(modelName, true),
    pascalCaseSingular: pascalCase(modelName, false),
  });
}
