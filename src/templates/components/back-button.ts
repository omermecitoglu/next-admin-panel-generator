import render from "~/core/template";
import handleBarsTemplate from "./back-button.hbs";

type BackButtonComponentTemplate = {
  i18n: boolean,
};

export default function generateBackButtonComponent(i18n: boolean) {
  return render<BackButtonComponentTemplate>(handleBarsTemplate, {
    i18n,
  });
}
