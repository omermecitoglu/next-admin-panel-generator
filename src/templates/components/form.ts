import { pascalCase } from "~/core/string";
import getTemplate from "~/core/template";
import handleBarsTemplate from "./form.hbs";

type FormComponentTemplate = {
  i18n: boolean,
  pascalCaseSingular: string,
};

export default function generateFormComponent(modelName: string, i18n: boolean) {
  const template = getTemplate<FormComponentTemplate>(handleBarsTemplate);
  return template({
    i18n,
    pascalCaseSingular: pascalCase(modelName, false),
  });
}
