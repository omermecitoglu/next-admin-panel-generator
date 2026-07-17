import render from "~/core/template";
import handleBarsTemplate from "./actions.hbs?raw";

type ActionsTemplate = {
  modelName: string,
  i18n: boolean,
};

export default function generateActions(modelName: string, i18n: boolean) {
  return render<ActionsTemplate>(handleBarsTemplate, {
    modelName,
    i18n,
  });
}
