import { capitalCase, kebabCase, noCase, pascalCase } from "~/core/string";
import getTemplate from "~/core/template";
import handleBarsTemplate from "./list.hbs";

type ListComponentTemplate = {
  i18n: boolean,
  capitalCaseSingular: string,
  kebabCasePlural: string,
  kebabCaseSingular: string,
  noCasePlural: string,
  pascalCaseSingular: string,
};

export default function generateListComponent(modelName: string, i18n: boolean) {
  const template = getTemplate<ListComponentTemplate>(handleBarsTemplate);
  return template({
    i18n,
    capitalCaseSingular: capitalCase(modelName, false, false),
    kebabCasePlural: kebabCase(modelName, false),
    kebabCaseSingular: kebabCase(modelName, false),
    noCasePlural: noCase(modelName, false),
    pascalCaseSingular: pascalCase(modelName, false),
  });
}
