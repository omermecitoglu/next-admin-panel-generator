import { camelCase, pascalCase } from "~/core/string";
import render from "~/core/template";
import handleBarsTemplate from "./data-mutations.hbs";

type DataMutationsTemplate = {
  camelCaseSingular: string,
  pascalCaseSingular: string,
};

export default function generateDataMutations(modelName: string) {
  return render<DataMutationsTemplate>(handleBarsTemplate, {
    camelCaseSingular: camelCase(modelName, false),
    pascalCaseSingular: pascalCase(modelName, false),
  });
}
