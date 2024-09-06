import { capitalCase, kebabCase, pascalCase } from "~/core/string";
import getTemplate from "~/core/template";
import handleBarsTemplate from "./create.hbs";

type CreateResourcePageTemplate = {
  i18n: boolean,
  capitalCaseSingular: string,
  kebabCasePlural: string,
  kebabCaseSingular: string,
  pascalCaseSingular: string,
};

export default function generateCreateResourcePage(modelName: string, i18n: boolean) {
  const template = getTemplate<CreateResourcePageTemplate>(handleBarsTemplate);
  return template({
    i18n,
    capitalCaseSingular: capitalCase(modelName, false, false),
    kebabCasePlural: kebabCase(modelName, true),
    kebabCaseSingular: kebabCase(modelName, false),
    pascalCaseSingular: pascalCase(modelName, false),
  });
}
