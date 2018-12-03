import { WordProcessor } from "../flyweight";
import type { TCharacter } from "../flyweight";
import moment from "moment";

describe("Flyweight", () => {
  describe("WordProcessor", () => {
    let wordProcessor: WordProcessor;

    beforeAll(() => {
      wordProcessor = new WordProcessor();
    });

    describe("#execute", () => {
      test("return proper compute when processes a valid document", () => {
        const document: string = "AaA";
        let result: Array<TCharacter | void> = [];

        for (let i: number = 0, max: number = document.length; i < max; i++) {
          const char: string = document.charAt(i);
          const when: string = moment().format();

          result.push({
            ascii: document.charCodeAt(i),
            decimal: parseInt(char, 10),
            octal: parseInt(char, 8),
            hexadecimal: parseInt(char, 16),
            binary: document.charCodeAt(i).toString(2),
            date: when
          });
        }

        expect(wordProcessor.execute(document)).toEqual(result);
      });

      test("returns undefined when processes an invalid document", () => {
        const document: string = "";
        const result: Array<void> = [];

        expect(wordProcessor.execute(document)).toEqual(result);
      });
    });
  });
});
