import {
  Form,
  FormLoginDecorator,
  FormRegisterDecorator,
  FormAutocompleteDecorator
} from "../decorator";

describe("Decorator", () => {
  let form: Form;

  beforeAll(() => {
    form = new Form();
  });

  describe("Form", () => {
    test("#getTarget", () => {
      expect(form.getTarget()).toBe("_blank");
    });
  });

  describe("FormLoginDecorator", () => {
    let formLoginDecorator: FormLoginDecorator;

    beforeAll(() => {
      formLoginDecorator = new FormLoginDecorator(form);
    });

    test("#getAction", () => {
      expect(formLoginDecorator.getAction()).toBe("/login");
    });
  });

  describe("FormRegisterDecorator", () => {
    let formRegisterDecorator: FormRegisterDecorator;

    beforeAll(() => {
      formRegisterDecorator = new FormRegisterDecorator(form);
    });

    test("#getAction", () => {
      expect(formRegisterDecorator.getAction()).toBe("/register");
    });
  });

  describe("FormAutocompleteDecorator", () => {
    describe("with main form", () => {
      let formAutocompleteDecorator: FormAutocompleteDecorator;

      describe("#getAutocomplete", () => {
        test("is true", () => {
          formAutocompleteDecorator = new FormAutocompleteDecorator(form, true);

          expect(formAutocompleteDecorator.getAutocomplete()).toBeTrue();
        });

        test("is false", () => {
          formAutocompleteDecorator = new FormAutocompleteDecorator(
            form,
            false
          );

          expect(formAutocompleteDecorator.getAutocomplete()).toBeFalse();
        });
      });
    });

    describe("with login decorator form", () => {
      let formLoginDecorator: FormLoginDecorator;
      let formAutocompleteDecorator: FormAutocompleteDecorator;

      describe("#getAutocomplete", () => {
        beforeAll(() => {
          formLoginDecorator = new FormLoginDecorator(form);
        });

        test("is true", () => {
          formAutocompleteDecorator = new FormAutocompleteDecorator(
            formLoginDecorator,
            true
          );

          expect(formAutocompleteDecorator.getAutocomplete()).toBeTrue();
        });

        test("is false", () => {
          formAutocompleteDecorator = new FormAutocompleteDecorator(
            formLoginDecorator,
            false
          );

          expect(formAutocompleteDecorator.getAutocomplete()).toBeFalse();
        });
      });
    });

    describe("with register decorator form", () => {
      let formRegisterDecorator: FormRegisterDecorator;
      let formAutocompleteDecorator: FormAutocompleteDecorator;

      describe("#getAutocomplete", () => {
        beforeAll(() => {
          formRegisterDecorator = new FormRegisterDecorator(form);
        });

        test("is true", () => {
          formAutocompleteDecorator = new FormAutocompleteDecorator(
            formRegisterDecorator,
            true
          );

          expect(formAutocompleteDecorator.getAutocomplete()).toBeTrue();
        });

        test("is false", () => {
          formRegisterDecorator = new FormRegisterDecorator(form);
          formAutocompleteDecorator = new FormAutocompleteDecorator(
            formRegisterDecorator,
            false
          );

          expect(formAutocompleteDecorator.getAutocomplete()).toBeFalse();
        });
      });
    });
  });
});
