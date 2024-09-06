#!/usr/bin/env node
import path from "node:path";
import { checkDirectoryExists, saveFile } from "./core/file";
import { getAdminRoutePath } from "./core/next";
import { kebabCase } from "./core/string";
import generateResourceListPage from "./templates/pages/list";

const modelName = "user post";
const i18n = false;

const usingSrc = await checkDirectoryExists(path.resolve("src/app"));
const adminRoutePath = getAdminRoutePath(usingSrc, i18n);
const baseRouterPath = path.resolve(adminRoutePath, kebabCase(modelName, true));

await saveFile(path.resolve(baseRouterPath), "page.tsx", generateResourceListPage(modelName, i18n));
