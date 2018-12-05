import {
  MiddlewareA,
  MiddlewareB,
  MiddlewareC
} from "../chain-of-responsibility";
import type { TRequest, TMiddleware } from "../chain-of-responsibility";

describe("Chain of responsibility", () => {
  describe("Middlewares", () => {
    let request: TRequest;
    let middlewareA: TMiddleware;
    let middlewareB: TMiddleware;
    let middlewareC: TMiddleware;
    let action: TMiddleware | TRequest;

    beforeEach(() => {
      request = {
        url: "https://example.com/api",
        method: "GET",
        statusCode: 200,
        requestHeaders: {
          Accept: "text/html"
        },
        responseHeaders: {
          ContentEncoding: "gzip"
        }
      };

      middlewareA = new MiddlewareA();
      middlewareB = new MiddlewareB();
      middlewareC = new MiddlewareC();

      middlewareA.setNext(middlewareB);
      middlewareB.setNext(middlewareC);
    });

    test("requests captured by middleware A", () => {
      const result: [string, string] = [
        "processedMiddlewareA",
        "Request has been captured by middleware A"
      ];

      action = middlewareA.handle(request, undefined);

      expect(action).toContainEntry(result);
    });

    test("requests captured by middleware B", () => {
      const result: [string, string] = [
        "processedMiddlewareB",
        "Request has been captured by middleware B"
      ];

      action = middlewareA.handle(request, undefined);

      expect(action).toContainEntry(result);
    });

    test("requests captured by middleware C", () => {
      const result: [string, string] = [
        "processedMiddlewareC",
        "Request has been captured by middleware C"
      ];

      action = middlewareA.handle(request, undefined);

      expect(action).toContainEntry(result);
    });

    describe("stops chain", () => {
      test("requested by middleware A", () => {
        const result: [string, string] = [
          "processedMiddlewareA",
          "Request has been captured by middleware A, end of chain"
        ];

        action = middlewareA.handle(request, "MiddlewareA");

        expect(action).toContainEntry(result);
      });

      test("requested by middleware B", () => {
        const result: [string, string] = [
          "processedMiddlewareB",
          "Request has been captured by middleware B, end of chain"
        ];

        action = middlewareA.handle(request, "MiddlewareB");

        expect(action).toContainEntry(result);
      });

      test("requested by middleware C", () => {
        const result: [string, string] = [
          "processedMiddlewareC",
          "Request has been captured by middleware C, end of chain"
        ];

        action = middlewareA.handle(request, "MiddlewareC");

        expect(action).toContainEntry(result);
      });
    });
  });
});
