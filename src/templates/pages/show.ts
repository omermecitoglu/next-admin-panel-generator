import { camelCase, capitalCase, kebabCase, pascalCase } from "~/core/string";
import getTemplate from "~/core/template";
import handleBarsTemplate from "./show.hbs";

type ShowResourcePageTemplate = {
  i18n: boolean,
  camelCaseSingular: string,
  capitalCaseSingular: string,
  kebabCasePlural: string,
  pascalCaseSingular: string,
};

export default function generateShowResourcePage(modelName: string, i18n: boolean) {
  const template = getTemplate<ShowResourcePageTemplate>(handleBarsTemplate);
  return template({
    i18n,
    camelCaseSingular: camelCase(modelName, false),
    capitalCaseSingular: capitalCase(modelName, false, false),
    kebabCasePlural: kebabCase(modelName, true),
    pascalCaseSingular: pascalCase(modelName, false),
  });
}
