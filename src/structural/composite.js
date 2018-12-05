export type TComponent = {
  name: string,
  type: string,
  constructor(name: string): void,
  getName(): string,
  getType(): string,
  addElement(component: TComponent): void | TComponent,
  getElement(componentName: string): void | TComponent,
  hasElement(componentName: string): boolean,
  removeElement(componentName: string): void | boolean,
  children(): number
};

interface IComponent {
  name: string;
  type: string;
  elements?: Array<TComponent>;

  constructor(name: string): void;
  getName(): string;
  getType(): string;
  addElement(component: TComponent): void | TComponent;
  getElement(componentName: string): void | TComponent;
  hasElement(componentName: string): boolean;
  removeElement(componentName: string): void | boolean;
  children(): number;
}

export class ElementNotFoundException extends Error {}

export class Leaf implements IComponent {
  name: string;
  type: string;

  constructor(name: string): void {
    this.name = name;
    this.type = "Leaf Node";
  }

  getName(): string {
    return this.name;
  }

  getType(): string {
    return this.type;
  }

  getElement(componentName: string): void {
    return undefined;
  }

  addElement(component: TComponent): void {
    return undefined;
  }

  hasElement(componentName: string): boolean {
    return false;
  }

  removeElement(componentName: string): void {
    return undefined;
  }

  children(): number {
    return 0;
  }

  static print(element: TComponent, indent: number): string {
    let tree: string = "";

    tree += `${"--".repeat(indent)}${element.getName()}`;

    return tree;
  }
}

export class Composite implements IComponent {
  name: string;
  type: string;
  elements: Array<TComponent>;

  constructor(name: string): void {
    this.name = name;
    this.type = "Composite Node";
    this.elements = [];
  }

  getName(): string {
    return this.name;
  }

  getType(): string {
    return this.type;
  }

  getElement(componentName: string): void | TComponent {
    let match: void | TComponent;

    for (const element: IComponent of this.elements) {
      const elements: any | Array<IComponent> = element.elements;

      if (element.getName() === componentName) {
        return element;
      }

      if (element.hasOwnProperty("elements") && elements.length > 0) {
        match = this._getIterator(element, componentName);

        if (match) {
          return match;
        }
      }
    }

    return match;
  }

  _getIterator(element: IComponent, name: string): void | TComponent {
    let match: void | IComponent;
    const elements: any | Array<IComponent> = element.elements;

    for (const item: TComponent of elements) {
      if (item.getName() === name) {
        return item;
      }

      if (item.hasOwnProperty("elements") && elements.length > 0) {
        match = this._getIterator(item, name);

        if (match) {
          return match;
        }
      }
    }

    return match;
  }

  addElement(component: TComponent): void | TComponent {
    if (this.getElement(component.getName())) {
      return component;
    } else {
      this.elements.push(component);
    }
  }

  hasElement(componentName: string): boolean {
    if (this.getElement(componentName)) {
      return true;
    }

    return false;
  }

  removeElement(componentName: string): void | boolean {
    const match: void | IComponent = this.getElement(componentName);

    if (!match) {
      return undefined;
    }

    this.elements.splice(this.elements.indexOf(match), 1);
    return true;
  }

  children(): number {
    let counter: number = 0;

    this.elements.forEach((element: IComponent) => {
      const elements: any | Array<IComponent> = element.elements;

      counter++;

      if (element.hasOwnProperty("elements") && elements.length > 0) {
        counter = counter + this._childrenIterator(element);
      }
    });

    return counter;
  }

  _childrenIterator(element: IComponent): number {
    let counter: number = 0;
    const elements: any | Array<IComponent> = element.elements;

    if (element.hasOwnProperty("elements") && elements.length > 0) {
      for (const item: TComponent of elements) {
        counter++;

        if (item.hasOwnProperty("elements")) {
          counter = counter + this._childrenIterator(item);
        }
      }
    }

    return counter;
  }

  static print(element: TComponent, indent: number): string {
    let tree: string = Composite._printIterator(element, indent, "");

    return tree;
  }

  static _printIterator(
    item: IComponent,
    indent: number,
    tree: string
  ): string {
    const elements: any | Array<IComponent> = item.elements;

    tree += `${"--".repeat(indent)}${item.getName()}\n`;
    indent++;

    if (item.hasOwnProperty("elements") && elements.length > 0) {
      for (const element: IComponent of elements) {
        tree = this._printIterator(element, indent, tree);
      }
    }

    return tree;
  }
}
