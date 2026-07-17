import render from "~/core/template";
import handleBarsTemplate from "./datasource.hbs?raw";

type DatasourceTemplate = {
  modelName: string,
};

export default function generateDatasource(modelName: string) {
  return render<DatasourceTemplate>(handleBarsTemplate, {
    modelName,
  });
}
