import { camelCase, capitalCase, kebabCase, pascalCase } from "~/core/string";
import getTemplate from "~/core/template";
import handleBarsTemplate from "./edit.hbs";

type EditResourcePageTemplate = {
  i18n: boolean,
  camelCaseSingular: string,
  capitalCaseSingular: string,
  kebabCaseSingular: string,
  kebabCasePlural: string,
  pascalCaseSingular: string,
};

export default function generateEditResourcePage(modelName: string, i18n: boolean) {
  const template = getTemplate<EditResourcePageTemplate>(handleBarsTemplate);
  return template({
    i18n,
    camelCaseSingular: camelCase(modelName, false),
    capitalCaseSingular: capitalCase(modelName, false, false),
    kebabCasePlural: kebabCase(modelName, true),
    kebabCaseSingular: kebabCase(modelName, false),
    pascalCaseSingular: pascalCase(modelName, false),
  });
}
