import { OldCalculator, NewCalculator, CalculatorAdapter } from "../adapter";

describe("Adapter", () => {
  describe("OldCalculator", () => {
    let oldCalculator;

    beforeAll(() => {
      oldCalculator = new OldCalculator();
    });

    test("#add", () => {
      expect(oldCalculator.add(1, 2)).toBe(3);
    });
  });

  describe("NewCalculator", () => {
    let newCalculator;

    beforeAll(() => {
      newCalculator = new NewCalculator();
    });

    test("#addition", () => {
      expect(newCalculator.addition(1, 2)).toBe(3);
    });
  });

  describe("CalculatorAdapter", () => {
    let calculatorAdapter;

    beforeAll(() => {
      calculatorAdapter = new CalculatorAdapter();
    });

    test("#add", () => {
      expect(calculatorAdapter.add(1, 2)).toBe(3);
    });
  });
});
