import { capitalCase, kebabCase, pascalCase } from "~/core/string";
import getTemplate from "~/core/template";
import template from "./create.hbs";

type CreateResourcePageTemplate = {
  subPath: string,
  i18n: boolean,
  capitalCaseSingular: string,
  kebabCasePlural: string,
  kebabCaseSingular: string,
  pascalCaseSingular: string,
};

export default function generateCreateResourcePage(modelName: string, i18n: boolean, subPath: string) {
  while (subPath.startsWith("/")) {
    subPath = subPath.slice(1);
  }
  subPath = subPath.replace(/\([^)]*\)/g, "");
  if (subPath.length) {
    subPath = "/" + subPath;
  }
  return getTemplate<CreateResourcePageTemplate>(template)({
    subPath,
    i18n,
    capitalCaseSingular: capitalCase(modelName, false, false),
    kebabCasePlural: kebabCase(modelName, true),
    kebabCaseSingular: kebabCase(modelName, false),
    pascalCaseSingular: pascalCase(modelName, false),
  });
}
