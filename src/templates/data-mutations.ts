import render from "~/core/template";
import handleBarsTemplate from "./data-mutations.hbs?raw";

type DataMutationsTemplate = {
  modelName: string,
};

export default function generateDataMutations(modelName: string) {
  return render<DataMutationsTemplate>(handleBarsTemplate, {
    modelName,
  });
}
