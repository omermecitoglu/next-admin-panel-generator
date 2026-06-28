#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import path from "node:path";
import prompts from "prompts";
import { checkDirectoryExists, saveFile } from "./core/file";
import { getAdminRoutePath } from "./core/next";
import { capitalCase, kebabCase, noCase, pascalCase } from "./core/string";
import generateActions from "./templates/actions";
import generateBackButtonComponent from "./templates/components/back-button";
import generateFormComponent from "./templates/components/form";
import generateListComponent from "./templates/components/list";
import generateDataMutations from "./templates/data-mutations";
import generateAllFetcherUtility from "./templates/data-utils/all";
import generateDatasource from "./templates/datasource";
import generateCreateResourcePage from "./templates/pages/create";
import generateEditResourcePage from "./templates/pages/edit";
import generateResourceListPage from "./templates/pages/list";
import generateShowResourcePage from "./templates/pages/show";
import { sortObjectKeysCaseSensitive } from "./utils/sortObjectKeysCaseSensitive";

const { modelName } = await prompts({
  type: "text",
  name: "modelName",
  message: "Enter model name",
});

const { subPath } = await prompts({
  type: "text",
  name: "subPath",
  message: "Enter subpath",
  initial: "/admin",
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
  const adminRoutePath = getAdminRoutePath(usingSrc, i18n, subPath);
  const baseRouterPath = path.resolve(adminRoutePath, kebabCase(modelName, true));
  const actionsPath = path.resolve(process.cwd(), usingSrc ? "src" : "", "actions");
  const datasourcePath = path.resolve(process.cwd(), usingSrc ? "src" : "", "data");
  const mutationsPath = path.resolve(datasourcePath, "mutations");
  const dataUtilsPath = path.resolve(datasourcePath, "utils");
  const componentsPath = path.resolve(process.cwd(), usingSrc ? "src" : "", "components");
  const adminComponentsPath = path.resolve(componentsPath, "admin", kebabCase(modelName, true));

  // pages
  await saveFile(path.resolve(baseRouterPath), "page.tsx", generateResourceListPage(modelName, i18n, subPath));
  await saveFile(path.resolve(baseRouterPath, "new"), "page.tsx", generateCreateResourcePage(modelName, i18n, subPath));
  await saveFile(path.resolve(baseRouterPath, "[id]"), "page.tsx", generateShowResourcePage(modelName, i18n, subPath));
  await saveFile(path.resolve(baseRouterPath, "[id]/edit"), "page.tsx", generateEditResourcePage(modelName, i18n, subPath));

  // actions
  await saveFile(actionsPath, `${kebabCase(modelName, false)}.ts`, generateActions(modelName, i18n));

  // data
  await saveFile(datasourcePath, `${kebabCase(modelName, true)}.ts`, generateDatasource(modelName));
  await saveFile(mutationsPath, `${kebabCase(modelName, false)}.ts`, generateDataMutations(modelName));

  // components
  await saveFile(adminComponentsPath, `${pascalCase(modelName, false)}Form.tsx`, generateFormComponent(modelName, i18n));
  await saveFile(adminComponentsPath, `${pascalCase(modelName, false)}List.tsx`, generateListComponent(modelName, i18n, subPath));
  await saveFile(componentsPath, "BackButton.tsx", generateBackButtonComponent(i18n));
  await saveFile(dataUtilsPath, "all.ts", generateAllFetcherUtility(i18n));

  if (i18n) {
    // dictionaries
    const englishDictionaryDir = path.resolve(process.cwd(), "dictionaries");
    const englishDictionaryPath = path.resolve(englishDictionaryDir, "en.json");
    const dictionary = JSON.parse(await readFile(englishDictionaryPath, "utf-8")) as Record<string, unknown>;
    const alteredDictionary = {
      ...dictionary,
      BackButton: {
        label: "Back",
      },
      FormField: {
        clientSideErrors: {
          rangeOverflow: "Must be less than or equal to {max}",
          rangeUnderflow: "Must be greater than or equal to {min}",
          tooLong: "Must be shorter than {maxLength} characters",
          tooShort: "Must be at least {minLength} characters",
          valueMissing: "This field is required",
        },
      },
      [pascalCase(modelName, false)]: {
        list: {
          title: capitalCase(modelName, true, false),
        },
        create: {
          title: `New ${capitalCase(modelName, false, false)}`,
          submit: "Create",
        },
        edit: {
          title: `Edit ${capitalCase(modelName, false, false)}`,
          submit: "Update",
        },
        delete: {
          title: `Delete ${capitalCase(modelName, false, false)}`,
          description: `Are you sure you want to delete this ${noCase(modelName, false)}?`,
          confirm: "Confirm",
          cancel: "Cancel",
        },
      },
    };
    const sortedDictionary = sortObjectKeysCaseSensitive(alteredDictionary);
    await saveFile(englishDictionaryDir, "en.json", JSON.stringify(sortedDictionary, null, 2) + "\n");
  }
}
