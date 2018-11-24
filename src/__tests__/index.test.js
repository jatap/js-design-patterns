import { spawnSync } from "child_process";

describe("main", () => {
  let execution;

  beforeAll(async () => {
    execution = await spawnSync(
      "node_modules/.bin/babel-node",
      ["src/index.js"],
      {
        stdio: "pipe",
        encoding: "utf-8"
      }
    );
  });

  test("prints repo description", () => {
    const result = "JavaScript Design Patterns";

    expect(execution.stdout.toString().trim()).toBe(result);
  });
});
