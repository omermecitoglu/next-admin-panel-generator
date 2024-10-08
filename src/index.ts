#!/usr/bin/env node
import path from "node:path";
import prompts from "prompts";
import { checkDirectoryExists, saveFile } from "./core/file";
import { getAdminRoutePath } from "./core/next";
import { kebabCase, pascalCase } from "./core/string";
import generateActions from "./templates/actions";
import generateBackButtonComponent from "./templates/components/back-button";
import generateFormComponent from "./templates/components/form";
import generateListComponent from "./templates/components/list";
import generateDatasource from "./templates/datasource";
import generateCreateResourcePage from "./templates/pages/create";
import generateEditResourcePage from "./templates/pages/edit";
import generateResourceListPage from "./templates/pages/list";
import generateShowResourcePage from "./templates/pages/show";

const { modelName } = await prompts({
  type: "text",
  name: "modelName",
  message: "Enter model name",
});

const { i18n } = await prompts({
  type: "select",
  name: "i18n",
  message: "Select your i18n plugin",
  choices: [
    { title: "next-intl", value: true },
    { title: "none", value: false },
  ],
  initial: 1,
});

if (modelName) {
  const usingSrc = await checkDirectoryExists(path.resolve("src/app"));
  const adminRoutePath = getAdminRoutePath(usingSrc, i18n);
  const baseRouterPath = path.resolve(adminRoutePath, kebabCase(modelName, true));
  const actionsPath = path.resolve(process.cwd(), usingSrc ? "src" : "", "actions");
  const datasourcePath = path.resolve(process.cwd(), usingSrc ? "src" : "", "datasource");
  const componentsPath = path.resolve(process.cwd(), usingSrc ? "src" : "", "components");
  const adminComponentsPath = path.resolve(componentsPath, "admin", kebabCase(modelName, true));

  // pages
  await saveFile(path.resolve(baseRouterPath), "page.tsx", generateResourceListPage(modelName, i18n));
  await saveFile(path.resolve(baseRouterPath, "new"), "page.tsx", generateCreateResourcePage(modelName, i18n));
  await saveFile(path.resolve(baseRouterPath, "[id]"), "page.tsx", generateShowResourcePage(modelName, i18n));
  await saveFile(path.resolve(baseRouterPath, "[id]/edit"), "page.tsx", generateEditResourcePage(modelName, i18n));

  // actions
  await saveFile(actionsPath, `${kebabCase(modelName, false)}.ts`, generateActions(modelName, i18n));

  // datasource
  await saveFile(datasourcePath, `${kebabCase(modelName, true)}.ts`, generateDatasource(modelName));

  // components
  await saveFile(adminComponentsPath, `${pascalCase(modelName, false)}Form.tsx`, generateFormComponent(modelName, i18n));
  await saveFile(adminComponentsPath, `${pascalCase(modelName, false)}List.tsx`, generateListComponent(modelName, i18n));
  await saveFile(componentsPath, "BackButton.tsx", generateBackButtonComponent(i18n));
}
