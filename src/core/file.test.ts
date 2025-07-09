import fs from "node:fs/promises";
import { describe, expect, it, vi } from "vitest";
import { appendFile, checkDirectoryExists, saveFile } from "./file";

describe("File operations", () => {
  const directory = "testDir";
  const fileName = "testFile.txt";
  const content = "Hello, World!";

  describe("checkDirectoryExists", () => {
    it("should return true if the directory exists", async () => {
      const spy = vi.spyOn(fs, "access").mockResolvedValueOnce(undefined);

      const result = await checkDirectoryExists(directory);

      expect(result).toBe(true);
      expect(spy).toHaveBeenCalledWith(directory, fs.constants.F_OK);
      spy.mockRestore();
    });

    it("should return false if the directory does not exist", async () => {
      const spy = vi.spyOn(fs, "access").mockRejectedValueOnce(new Error("Directory does not exist"));

      const result = await checkDirectoryExists(directory);

      expect(result).toBe(false);
      expect(spy).toHaveBeenCalledWith(directory, fs.constants.F_OK);
      spy.mockRestore();
    });
  });

  describe("saveFile", () => {
    it("should create the directory and save the file", async () => {
      const spyForMkdir = vi.spyOn(fs, "mkdir").mockResolvedValueOnce(undefined);
      const spyForWriteFile = vi.spyOn(fs, "writeFile").mockResolvedValueOnce(undefined);
      await saveFile(directory, fileName, content);

      expect(spyForMkdir).toHaveBeenCalledWith(expect.any(String), { recursive: true });
      expect(spyForWriteFile).toHaveBeenCalledWith(expect.any(String), content, "utf8");
      spyForMkdir.mockRestore();
      spyForWriteFile.mockRestore();
    });
  });

  describe("appendFile", () => {
    it("should create the directory and append content to the file", async () => {
      const spyForMkdir = vi.spyOn(fs, "mkdir").mockResolvedValueOnce(undefined);
      const spyForAppendFile = vi.spyOn(fs, "appendFile").mockResolvedValueOnce(undefined);
      await appendFile(directory, fileName, content);

      expect(spyForMkdir).toHaveBeenCalledWith(expect.any(String), { recursive: true });
      expect(spyForAppendFile).toHaveBeenCalledWith(expect.any(String), content + "\n", "utf8");
      spyForMkdir.mockRestore();
      spyForAppendFile.mockRestore();
    });
  });
});
