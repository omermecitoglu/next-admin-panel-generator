#!/usr/bin/env node
import path from "node:path";
import { checkDirectoryExists, saveFile } from "./core/file";
import { getAdminRoutePath } from "./core/next";
import { kebabCase } from "./core/string";
import generateActions from "./templates/actions";
import generateCreateResourcePage from "./templates/pages/create";
import generateEditResourcePage from "./templates/pages/edit";
import generateResourceListPage from "./templates/pages/list";
import generateShowResourcePage from "./templates/pages/show";

const modelName = "user post";
const i18n = false;

const usingSrc = await checkDirectoryExists(path.resolve("src/app"));
const adminRoutePath = getAdminRoutePath(usingSrc, i18n);
const baseRouterPath = path.resolve(adminRoutePath, kebabCase(modelName, true));
const actionsPath = path.resolve(process.cwd(), usingSrc ? "src" : "", "actions");

// pages
await saveFile(path.resolve(baseRouterPath), "page.tsx", generateResourceListPage(modelName, i18n));
await saveFile(path.resolve(baseRouterPath, "new"), "page.tsx", generateCreateResourcePage(modelName, i18n));
await saveFile(path.resolve(baseRouterPath, "[id]"), "page.tsx", generateShowResourcePage(modelName, i18n));
await saveFile(path.resolve(baseRouterPath, "[id]/edit"), "page.tsx", generateEditResourcePage(modelName, i18n));

// actions
await saveFile(path.resolve(actionsPath), `${kebabCase(modelName, false)}.ts`, generateActions(modelName, i18n));
