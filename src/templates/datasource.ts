import { camelCase, pascalCase } from "~/core/string";
import getTemplate from "~/core/template";
import handleBarsTemplate from "./datasource.hbs";

type DatasourceTemplate = {
  camelCaseSingular: string,
  pascalCasePlural: string,
  pascalCaseSingular: string,
};

export default function generateDatasource(modelName: string) {
  const template = getTemplate<DatasourceTemplate>(handleBarsTemplate);
  return template({
    camelCaseSingular: camelCase(modelName, false),
    pascalCasePlural: pascalCase(modelName, true),
    pascalCaseSingular: pascalCase(modelName, false),
  });
}
