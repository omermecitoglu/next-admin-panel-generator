import { camelCase, kebabCase, pascalCase } from "~/core/string";
import getTemplate from "~/core/template";
import handleBarsTemplate from "./actions.hbs";

type ActionsTemplate = {
  i18n: boolean,
  camelCaseSingular: string,
  kebabCasePlural: string,
  kebabCaseSingular: string,
  pascalCasePlural: string,
};

export default function generateActions(modelName: string, i18n: boolean) {
  const template = getTemplate<ActionsTemplate>(handleBarsTemplate);
  return template({
    i18n,
    camelCaseSingular: camelCase(modelName, false),
    kebabCasePlural: kebabCase(modelName, true),
    kebabCaseSingular: kebabCase(modelName, false),
    pascalCasePlural: pascalCase(modelName, false),
  });
}
