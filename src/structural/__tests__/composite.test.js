import { Leaf, Composite } from "../composite";
import type { TComponent } from "../composite";

describe("Composite", () => {
  describe("Leaf", () => {
    let lroot: TComponent;

    beforeAll(() => {
      lroot = new Leaf("root");
    });

    test("#getName", () => {
      expect(lroot.getName()).toBe("root");
    });

    test("#getType", () => {
      expect(lroot.getType()).toBe("Leaf Node");
    });

    describe("#getElement", () => {
      test("returns undefined", () => {
        const left1: TComponent = new Leaf("left1");

        expect(lroot.getElement(left1.getName())).toBeUndefined();
      });
    });

    describe("#addElement", () => {
      test("returns undefined", () => {
        const left1: TComponent = new Leaf("left1");

        expect(lroot.addElement(left1)).toBeUndefined();
      });
    });

    describe("#hasElement", () => {
      test("returns false", () => {
        const left1: TComponent = new Leaf("left1");

        expect(lroot.hasElement(left1.getName())).toBeFalse();
      });
    });

    describe("#removeElement", () => {
      test("returns undefined", () => {
        const left1: TComponent = new Leaf("left1");

        expect(lroot.removeElement(left1.getName())).toBeUndefined();
      });
    });

    test("#children", () => {
      expect(lroot.children()).toBe(0);
    });

    test("#print", () => {
      const result: string = "--root";
      expect(Leaf.print(lroot, 1)).toBe(result);
    });
  });

  describe("Composite", () => {
    let croot: TComponent;

    beforeEach(() => {
      croot = new Composite("root");
    });

    test("#getName", () => {
      expect(croot.getName()).toBe("root");
    });

    test("#getType", () => {
      expect(croot.getType()).toBe("Composite Node");
    });

    describe("#getElement", () => {
      describe("when first level", () => {
        test("returns element if it's a leaf", () => {
          const left1: TComponent = new Leaf("left1");

          croot.addElement(left1);

          expect(croot.getElement(left1.getName())).toBe(left1);
        });

        test("returns element if it's a composite", () => {
          const right1: TComponent = new Composite("right1");

          croot.addElement(right1);

          expect(croot.getElement(right1.getName())).toBe(right1);
        });
      });

      describe("when second level", () => {
        let left1: TComponent;
        let right1: TComponent;

        beforeEach(() => {
          left1 = new Leaf("left1");
          right1 = new Composite("right1");

          croot.addElement(left1);
          croot.addElement(right1);
        });

        test("returns element if it's a leaf", () => {
          const left11: TComponent = new Leaf("left11");

          right1.addElement(left11);

          expect(croot.getElement(left11.getName())).toBe(left11);
        });

        test("returns element if it's a composite", () => {
          const right11: TComponent = new Composite("right11");

          right1.addElement(right11);

          expect(croot.getElement(right11.getName())).toBe(right11);
        });

        test("returns element if it's one of the available composites", () => {
          const right11: TComponent = new Composite("right11");
          const left111: TComponent = new Leaf("left111");
          const left112: TComponent = new Leaf("left112");
          const right111: TComponent = new Composite("right111");
          const left11: TComponent = new Leaf("left11");

          right1.addElement(right11);
          right11.addElement(right111);
          right111.addElement(left111);
          right111.addElement(left112);
          right1.addElement(left11);

          expect(croot.getElement(left111.getName())).toBe(left111);
        });
      });

      describe("when third level", () => {
        let left1: TComponent;
        let right1: TComponent;
        let left11: TComponent;
        let right11: TComponent;

        beforeEach(() => {
          left1 = new Leaf("left1");
          right1 = new Composite("right1");
          left11 = new Leaf("left11");
          right11 = new Composite("right11");

          croot.addElement(left1);
          croot.addElement(right1);
          right1.addElement(left11);
          right1.addElement(right11);
          croot.addElement(right11);
        });

        test("returns element if it's a leaf", () => {
          const left111: TComponent = new Leaf("left111");

          right11.addElement(left111);

          expect(croot.getElement(left111.getName())).toBe(left111);
        });

        test("returns element if it's a composite", () => {
          const right111: TComponent = new Composite("right111");

          right11.addElement(right111);

          expect(croot.getElement(right111.getName())).toBe(right111);
        });
      });

      test("returns undefined when element doesn't exist", () => {
        const left1: TComponent = new Leaf("left1");

        expect(croot.getElement(left1.getName())).toBeUndefined();
      });
    });

    describe("#addElement", () => {
      test("returns undefined when an element has added", () => {
        const left1: TComponent = new Leaf("left1");

        expect(croot.addElement(left1)).toBeUndefined();
      });

      test("returns element if element exists", () => {
        const left1: TComponent = new Leaf("left1");

        croot.addElement(left1);

        expect(croot.addElement(left1)).toBe(left1);
      });
    });

    describe("#hasElement", () => {
      test("returns true if element exists", () => {
        const left1: TComponent = new Leaf("left1");

        croot.addElement(left1);

        expect(croot.hasElement(left1.getName())).toBeTrue();
      });

      test("returns false if element doesn't exist", () => {
        const right1: TComponent = new Composite("right1");

        expect(croot.hasElement(right1.getName())).toBeFalse();
      });
    });

    describe("#removeElement", () => {
      test("returns true if element exists", () => {
        const left1: TComponent = new Leaf("left1");

        croot.addElement(left1);

        expect(croot.removeElement(left1.getName())).toBeTrue();
      });

      test("returns undefined if element doesn't exist", () => {
        const left1: TComponent = new Leaf("left1");

        expect(croot.removeElement(left1.getName())).toBeUndefined();
      });
    });

    describe("#children", () => {
      describe("when zero level", () => {
        test("includes children at next level", () => {
          const left1: TComponent = new Leaf("left1");
          const right1: TComponent = new Composite("right1");

          croot.addElement(left1);
          croot.addElement(right1);

          expect(croot.children()).toBe(2);
        });

        test("includes children at any level", () => {
          const left1: TComponent = new Leaf("left1");
          const right1: TComponent = new Composite("right1");
          const left11: TComponent = new Leaf("lef11");
          const right11: TComponent = new Composite("right11");
          const left111: TComponent = new Leaf("left111");
          const right111: TComponent = new Composite("right111");

          croot.addElement(left1);
          croot.addElement(right1);
          right1.addElement(left11);
          right1.addElement(right11);
          right11.addElement(left111);
          right11.addElement(right111);

          expect(croot.children()).toBe(6);
        });
      });

      describe("when first level", () => {
        test("includes children at next level", () => {
          const right1: TComponent = new Composite("right1");
          const left11: TComponent = new Leaf("lef11");
          const right11: TComponent = new Composite("right11");
          const left111: TComponent = new Leaf("left111");
          const right111: TComponent = new Composite("right111");

          right1.addElement(left11);
          right1.addElement(right11);
          right1.addElement(left111);
          right1.addElement(right111);

          expect(right1.children()).toBe(4);
        });

        test("includes children at any level", () => {
          const right1: TComponent = new Composite("right1");
          const left11: TComponent = new Leaf("lef11");
          const right11: TComponent = new Composite("right11");
          const right111: TComponent = new Composite("right111");
          const left1111: TComponent = new Leaf("left1111");

          right1.addElement(left11);
          right1.addElement(right11);
          right11.addElement(right111);
          right111.addElement(left1111);

          expect(right1.children()).toBe(4);
        });
      });

      describe("when second level", () => {
        test("includes children at next level", () => {
          const left11: TComponent = new Leaf("lef11");
          const right11: TComponent = new Composite("right11");
          const left111: TComponent = new Leaf("left111");
          const right111: TComponent = new Composite("right111");

          right11.addElement(left11);
          right11.addElement(left111);
          right11.addElement(right111);

          expect(right11.children()).toBe(3);
        });

        test("includes children at any level", () => {
          const left11: TComponent = new Leaf("lef11");
          const right11: TComponent = new Composite("right11");
          const left111: TComponent = new Leaf("left111");
          const right111: TComponent = new Composite("right111");
          const left1111: TComponent = new Leaf("left1111");
          const right1111: TComponent = new Composite("right1111");

          right11.addElement(left11);
          right11.addElement(right111);
          right111.addElement(left111);
          right111.addElement(right1111);
          right1111.addElement(left1111);

          expect(right11.children()).toBe(5);
        });
      });
    });

    describe("#print", () => {
      describe("when zero level", () => {
        test("no children", () => {
          const result: string = "--root\n";

          expect(Composite.print(croot, 1)).toBe(result);
        });

        test("with children at first level", () => {
          const left1: TComponent = new Leaf("left1");
          const right1: TComponent = new Composite("right1");
          const result: string = "--root\n----left1\n----right1\n";

          croot.addElement(left1);
          croot.addElement(right1);

          expect(Composite.print(croot, 1)).toBe(result);
        });

        test("with children at second level", () => {
          const left1: TComponent = new Leaf("left1");
          const right1: TComponent = new Composite("right1");
          const left11: TComponent = new Leaf("left11");
          const right11: TComponent = new Composite("right11");
          const result: string =
            "--root\n----left1\n----right1\n------left11\n------right11\n";

          croot.addElement(left1);
          croot.addElement(right1);
          right1.addElement(left11);
          right1.addElement(right11);

          expect(Composite.print(croot, 1)).toBe(result);
        });
      });

      describe("when first level", () => {
        test("no children", () => {
          const left1: TComponent = new Leaf("left1");
          const right1: TComponent = new Composite("right1");
          const result: string = "--right1\n";

          croot.addElement(left1);
          croot.addElement(right1);

          expect(Composite.print(right1, 1)).toBe(result);
        });

        test("with children at first level", () => {
          const left1: TComponent = new Leaf("left1");
          const right1: TComponent = new Composite("right1");
          const left11: TComponent = new Leaf("left11");
          const right11: TComponent = new Composite("right11");
          const result: string = "--right1\n----left11\n----right11\n";

          croot.addElement(left1);
          croot.addElement(right1);
          right1.addElement(left11);
          right1.addElement(right11);

          expect(Composite.print(right1, 1)).toBe(result);
        });
      });
    });
  });
});
