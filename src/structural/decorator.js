export class Form {
  _target: string;
  _action: string;
  _autocomplete: boolean;

  constructor() {
    this._target = "_blank";
  }

  getTarget() {
    return this._target;
  }
}

export class FormLoginDecorator {
  _form: Form;

  constructor(form: Form) {
    this._form = form;
    this._form._action = "/login";
  }

  getAction() {
    return this._form._action;
  }
}

export class FormRegisterDecorator {
  _form: Form;

  constructor(form: Form) {
    this._form = form;
    this._form._action = "/register";
  }

  getAction() {
    return this._form._action;
  }
}

interface IForm {
  _target?: string;
  _action?: string;
  _autocomplete?: boolean;
}

export class FormAutocompleteDecorator {
  _form: IForm;

  constructor(form: IForm, autocomplete: boolean) {
    this._form = form;
    this._form._autocomplete = autocomplete;
  }

  getAutocomplete() {
    return this._form._autocomplete;
  }
}
