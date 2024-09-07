import getTemplate from "~/core/template";
import handleBarsTemplate from "./back-button.hbs";

type BackButtonComponentTemplate = {
  i18n: boolean,
};

export default function generateBackButtonComponent(i18n: boolean) {
  const template = getTemplate<BackButtonComponentTemplate>(handleBarsTemplate);
  return template({
    i18n,
  });
}
