import render from "~/core/template";
import handleBarsTemplate from "./all.hbs?raw";

type AllFetcherUtilityTemplate = {
  i18n: boolean,
};

export default function generateAllFetcherUtility(i18n: boolean) {
  return render<AllFetcherUtilityTemplate>(handleBarsTemplate, {
    i18n,
  });
}
