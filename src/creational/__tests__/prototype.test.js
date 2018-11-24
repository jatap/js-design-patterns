import { Server, Nginx, Apache } from "../prototype";

describe("Prototype", () => {
  let server;

  beforeAll(() => {
    server = Server;
  });

  describe("Server", () => {
    describe("#start", () => {
      let subject: string;

      beforeAll(() => {
        subject = server.start();
      });

      it("starts the server", () => {
        expect(subject).toBe("starting...");
      });
    });

    describe("#stop", () => {
      let subject: string;

      beforeAll(() => {
        subject = server.stop();
      });

      it("stops the server", () => {
        expect(subject).toBe("stopping...");
      });
    });

    describe("#status", () => {
      let subject: string;

      beforeAll(() => {
        subject = server.status();
      });

      it("shots the status", () => {
        expect(subject).toBe("checking...");
      });
    });

    describe(".user", () => {
      let subject: string;

      beforeAll(() => {
        subject = server.user;
      });

      it("returns user", () => {
        expect(subject).toBe("root");
      });
    });

    describe(".group", () => {
      let subject: string;

      beforeAll(() => {
        subject = server.group;
      });

      it("returns group", () => {
        expect(subject).toBe("root");
      });
    });
  });

  describe("Nginx", () => {
    let nginx;

    beforeAll(() => {
      nginx = Nginx;
    });

    it("shares object prototype with Server", () => {
      expect(Object.getPrototypeOf(nginx)).toBe(server);
    });

    describe("#name", () => {
      it("shows server name", () => {
        expect(nginx.name).toBe("nginx");
      });
    });
  });

  describe("Apache", () => {
    let apache;

    beforeAll(() => {
      apache = Apache;
    });

    it("shares object prototype with Server", () => {
      expect(Object.getPrototypeOf(apache)).toBe(server);
    });

    describe("#name", () => {
      it("shows server name", () => {
        expect(apache.name).toBe("apache");
      });

      it("xxx", () => {
        expect(apache).toContainAnyKeys(["user"]);
      });
    });
  });
});
