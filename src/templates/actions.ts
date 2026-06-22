import { camelCase, kebabCase, pascalCase } from "~/core/string";
import render from "~/core/template";
import handleBarsTemplate from "./actions.hbs";

type ActionsTemplate = {
  i18n: boolean,
  camelCaseSingular: string,
  kebabCasePlural: string,
  kebabCaseSingular: string,
  pascalCasePlural: string,
};

export default function generateActions(modelName: string, i18n: boolean) {
  return render<ActionsTemplate>(handleBarsTemplate, {
    i18n,
    camelCaseSingular: camelCase(modelName, false),
    kebabCasePlural: kebabCase(modelName, true),
    kebabCaseSingular: kebabCase(modelName, false),
    pascalCasePlural: pascalCase(modelName, false),
  });
}
