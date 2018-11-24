export class OldCalculator {
  add(first: number, second: number): number {
    return first + second;
  }
}

export class NewCalculator {
  addition(first: number, second: number): number {
    return first + second;
  }
}

export class CalculatorAdapter {
  calculator: OldCalculator;

  constructor() {
    this.calculator = new OldCalculator();
  }

  add(first: number, second: number) {
    return this.calculator.add(first, second);
  }
}
