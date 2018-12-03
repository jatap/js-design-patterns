import { s3infoProxy } from "../proxy";

describe("Proxy", () => {
  describe("#s3infoProxy", () => {
    test("collected from file system", () => {
      const file: string = "data.json";
      const result: string = `[INFO] File: ${file} Collected from file system`;

      expect(s3infoProxy(file)).toBe(result);
    });

    test("collected from cache", () => {
      const file: string = "data.json";
      const result: string = `[INFO] File: ${file} Collected from cache`;

      expect(s3infoProxy(file)).toBe(result);
    });

    test("collected from file system if filename is different", () => {
      const file: string = "new-file.json";
      const result: string = `[INFO] File: ${file} Collected from file system`;

      expect(s3infoProxy(file)).toBe(result);
    });
  });
});
