import render from "~/core/template";
import handleBarsTemplate from "./form.hbs";

type FormComponentTemplate = {
  modelName: string,
  i18n: boolean,
};

export default function generateFormComponent(modelName: string, i18n: boolean) {
  return render<FormComponentTemplate>(handleBarsTemplate, {
    modelName,
    i18n,
  });
}
