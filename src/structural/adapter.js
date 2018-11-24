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
  calculator: NewCalculator;

  constructor() {
    this.calculator = new NewCalculator();
  }

  add(first: number, second: number) {
    return this.calculator.addition(first, second);
  }
}
