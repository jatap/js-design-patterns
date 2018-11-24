export const Server = {
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

export const Nginx = Object.create(Server, { name: { value: "nginx" } });
export const Apache = Object.create(Server, { name: { value: "apache" } });
