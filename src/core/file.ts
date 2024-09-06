import fs from "node:fs/promises";
import path from "node:path";

export async function checkDirectoryExists(dirPath: string): Promise<boolean> {
  try {
    await fs.access(dirPath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export async function saveFile(directory: string, fileName: string, content: string) {
  const dirPath = path.resolve(process.cwd(), directory);
  await fs.mkdir(dirPath, { recursive: true });
  const filePath = path.resolve(dirPath, fileName);
  await fs.writeFile(filePath, content, "utf8");
}

export async function appendFile(directory: string, fileName: string, content: string) {
  const dirPath = path.resolve(process.cwd(), directory);
  await fs.mkdir(dirPath, { recursive: true });
  const filePath = path.resolve(dirPath, fileName);
  await fs.appendFile(filePath, content + "\n", "utf8");
}
