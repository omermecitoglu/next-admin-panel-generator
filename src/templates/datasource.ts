import render from "~/core/template";
import handleBarsTemplate from "./datasource.hbs";

type DatasourceTemplate = {
  modelName: string,
};

export default function generateDatasource(modelName: string) {
  return render<DatasourceTemplate>(handleBarsTemplate, {
    modelName,
  });
}
