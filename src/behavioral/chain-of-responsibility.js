export type TRequest = {
  url: string,
  method: string,
  statusCode: number,
  requestHeaders: {
    Accept: string
  },
  responseHeaders: {
    ContentEncoding: string
  },
  processedMiddlewareA?: string,
  processedMiddlewareB?: string,
  processedMiddlewareC?: string
};

export type TMiddleware = {
  setNext(middleware: TMiddleware): TMiddleware,
  handle(request: TRequest, stop: string | void): TMiddleware | TRequest
};

interface IMiddleware {
  setNext(middleware: TMiddleware): TMiddleware;
  handle(request: TRequest, stop: string | void): TMiddleware | TRequest;
}

class BaseMiddleware implements IMiddleware {
  #nextMiddleware: TMiddleware;

  setNext(middleware: TMiddleware): TMiddleware {
    this.#nextMiddleware = middleware;

    return middleware;
  }

  handle(request: TRequest, stop: string | void): TMiddleware | TRequest {
    if (this.#nextMiddleware) {
      return this.#nextMiddleware.handle(request, stop);
    }

    return request;
  }
}

export class MiddlewareA extends BaseMiddleware {
  handle(request: TRequest, stop: string | void): TMiddleware | TRequest {
    if (stop === "MiddlewareA") {
      const msg: string =
        "Request has been captured by middleware A, end of chain";
      request.processedMiddlewareA = msg;

      return request;
    }

    const msg: string = "Request has been captured by middleware A";

    request.processedMiddlewareA = msg;

    return super.handle(request, stop);
  }
}

export class MiddlewareB extends BaseMiddleware {
  handle(request: TRequest, stop: string | void): TMiddleware | TRequest {
    if (stop === "MiddlewareB") {
      const msg: string =
        "Request has been captured by middleware B, end of chain";
      request.processedMiddlewareB = msg;

      return request;
    }

    const msg: string = "Request has been captured by middleware B";

    request.processedMiddlewareB = msg;

    return super.handle(request, stop);
  }
}

export class MiddlewareC extends BaseMiddleware {
  handle(request: TRequest, stop: string | void): TMiddleware | TRequest {
    if (stop === "MiddlewareC") {
      const msg: string =
        "Request has been captured by middleware C, end of chain";
      request.processedMiddlewareC = msg;

      return request;
    }

    const msg: string = "Request has been captured by middleware C";

    request.processedMiddlewareC = msg;

    return super.handle(request, stop);
  }
}
