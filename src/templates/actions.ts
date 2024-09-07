import { kebabCase } from "~/core/string";
import getTemplate from "~/core/template";
import handleBarsTemplate from "./actions.hbs";

type ActionsTemplate = {
  i18n: boolean,
  kebabCasePlural: string,
};

export default function generateActions(modelName: string, i18n: boolean) {
  const template = getTemplate<ActionsTemplate>(handleBarsTemplate);
  return template({
    i18n,
    kebabCasePlural: kebabCase(modelName, true),
  });
}
