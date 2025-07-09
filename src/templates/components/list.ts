import { capitalCase, kebabCase, noCase, pascalCase } from "~/core/string";
import getTemplate from "~/core/template";
import template from "./list.hbs";

type ListComponentTemplate = {
  subPath: string,
  i18n: boolean,
  capitalCaseSingular: string,
  kebabCasePlural: string,
  kebabCaseSingular: string,
  noCasePlural: string,
  pascalCaseSingular: string,
};

export default function generateListComponent(modelName: string, i18n: boolean, subPath: string) {
  while (subPath.startsWith("/")) {
    subPath = subPath.slice(1);
  }
  subPath = subPath.replace(/\([^)]*\)/g, "");
  if (subPath.length) {
    subPath = "/" + subPath;
  }
  return getTemplate<ListComponentTemplate>(template)({
    subPath,
    i18n,
    capitalCaseSingular: capitalCase(modelName, false, false),
    kebabCasePlural: kebabCase(modelName, true),
    kebabCaseSingular: kebabCase(modelName, false),
    noCasePlural: noCase(modelName, false),
    pascalCaseSingular: pascalCase(modelName, false),
  });
}
