import { camelCase, pascalCase } from "~/core/string";
import render from "~/core/template";
import handleBarsTemplate from "./datasource.hbs";

type DatasourceTemplate = {
  camelCaseSingular: string,
  pascalCasePlural: string,
  pascalCaseSingular: string,
};

export default function generateDatasource(modelName: string) {
  return render<DatasourceTemplate>(handleBarsTemplate, {
    camelCaseSingular: camelCase(modelName, false),
    pascalCasePlural: pascalCase(modelName, true),
    pascalCaseSingular: pascalCase(modelName, false),
  });
}
