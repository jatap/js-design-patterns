export type TServer = {
  user: string,
  group: string,
  start(): string,
  stop(): string,
  status(): string
};

export type TPrototype = {
  user: string,
  group: string,
  start(): string,
  stop(): string,
  status(): string,
  name: string
};

export const Server: TServer = {
  user: "root",
  group: "root",

  start(): string {
    return "starting...";
  },

  stop(): string {
    return "stopping...";
  },

  status(): string {
    return "checking...";
  }
};

export const Nginx: TPrototype = Object.create(Server, {
  name: { value: "nginx" }
});
export const Apache: TPrototype = Object.create(Server, {
  name: { value: "apache" }
});
