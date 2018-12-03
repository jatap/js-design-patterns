import moment from "moment";

export type TCharacter = {
  ascii: number,
  decimal: number,
  octal: number,
  hexadecimal: number,
  binary: string,
  date?: string
};

export class WordProcessor {
  execute(document: string): Array<TCharacter | void> {
    const characterFactory: CharacterFactory = new CharacterFactory();
    let result: Array<TCharacter | void> = [];

    for (let i: number = 0, max: number = document.length; i < max; i++) {
      const char: Character = characterFactory.process(document.charAt(i));
      const when: string = moment().format();

      char.setInfoDate(when);

      result.push(char.getInfo());
    }

    return result;
  }
}

class Character {
  _code: string;
  _info: TCharacter;

  constructor(code: string): void {
    this._code = code;
    this.setInfo();
  }

  setInfo(): void {
    this._info = {
      ascii: this._code.charCodeAt(0),
      decimal: parseInt(this._code, 10),
      octal: parseInt(this._code, 8),
      hexadecimal: parseInt(this._code, 16),
      binary: this._code.charCodeAt(0).toString(2)
    };
  }

  getInfo(): TCharacter {
    return this._info;
  }

  setInfoDate(when: string): void {
    this._info.date = when;
  }
}

class CharacterFactory {
  _characters: Array<Character | any>;

  constructor(): void {
    this._characters = [];
  }

  getCharacter(code: string): Character | void {
    return this._characters.find((char: { _code: string }) => {
      return char._code === code;
    });
  }

  process(code: string): Character {
    let char: Character | void = this.getCharacter(code);

    if (char) {
      return char;
    } else {
      const newChar: Character = new Character(code);

      this._characters.push(newChar);

      return newChar;
    }
  }
}
