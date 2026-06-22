import { pascalCase } from "~/core/string";
import render from "~/core/template";
import handleBarsTemplate from "./form.hbs";

type FormComponentTemplate = {
  i18n: boolean,
  pascalCaseSingular: string,
};

export default function generateFormComponent(modelName: string, i18n: boolean) {
  return render<FormComponentTemplate>(handleBarsTemplate, {
    i18n,
    pascalCaseSingular: pascalCase(modelName, false),
  });
}
