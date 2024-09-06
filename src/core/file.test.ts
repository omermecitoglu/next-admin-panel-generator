import fs from "node:fs/promises";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { appendFile, checkDirectoryExists, saveFile } from "./file";

jest.mock("node:fs/promises");

describe("File operations", () => {
  const directory = "testDir";
  const fileName = "testFile.txt";
  const content = "Hello, World!";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("checkDirectoryExists", () => {
    it("should return true if the directory exists", async () => {
      (fs.access as jest.MockedFunction<typeof fs.access>).mockResolvedValueOnce(undefined);

      const result = await checkDirectoryExists(directory);

      expect(result).toBe(true);
      expect(fs.access).toHaveBeenCalledWith(directory, fs.constants.F_OK);
    });

    it("should return false if the directory does not exist", async () => {
      (fs.access as jest.MockedFunction<typeof fs.access>).mockRejectedValueOnce(new Error("Directory does not exist"));

      const result = await checkDirectoryExists(directory);

      expect(result).toBe(false);
      expect(fs.access).toHaveBeenCalledWith(directory, fs.constants.F_OK);
    });
  });

  describe("saveFile", () => {
    it("should create the directory and save the file", async () => {
      await saveFile(directory, fileName, content);

      expect(fs.mkdir).toHaveBeenCalledWith(expect.any(String), { recursive: true });
      expect(fs.writeFile).toHaveBeenCalledWith(expect.any(String), content, "utf8");
    });
  });

  describe("appendFile", () => {
    it("should create the directory and append content to the file", async () => {
      await appendFile(directory, fileName, content);

      expect(fs.mkdir).toHaveBeenCalledWith(expect.any(String), { recursive: true });
      expect(fs.appendFile).toHaveBeenCalledWith(expect.any(String), content + "\n", "utf8");
    });
  });
});
