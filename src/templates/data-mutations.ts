import { camelCase, pascalCase } from "~/core/string";
import getTemplate from "~/core/template";
import handleBarsTemplate from "./data-mutations.hbs";

type DataMutationsTemplate = {
  camelCaseSingular: string,
  pascalCaseSingular: string,
};

export default function generateDataMutations(modelName: string) {
  return getTemplate<DataMutationsTemplate>(handleBarsTemplate)({
    camelCaseSingular: camelCase(modelName, false),
    pascalCaseSingular: pascalCase(modelName, false),
  });
}
