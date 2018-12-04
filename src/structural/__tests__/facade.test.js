import { CustomerService } from "../facade";

describe("Facade", () => {
  describe("CustomerService", () => {
    let customerService: CustomerService;

    beforeAll(() => {
      customerService = new CustomerService();
    });

    describe("#entry", () => {
      test("records a new order with most popular items", () => {
        const action: string = customerService.entry({
          postcode: "EC2Y 5HN",
          fullname: "John Doe",
          items: ["Paella valenciana", "Beer", "Cheese cake"]
        });
        const result: string =
          "Hey John Doe, your order will be delivered in 30mins at EC2Y 5HN";

        expect(action).toBe(result);
      });

      test("records an invalid order", () => {
        const action: string = customerService.entry({
          postcode: "EC2Y 5HN",
          fullname: "John Doe",
          items: []
        });
        const result: string =
          "Hey John Doe, your order won't be delivered at EC2Y 5HN";

        expect(action).toBe(result);
      });

      test("records an invalid bill", () => {
        const action: string = customerService.entry({
          postcode: "EC2Y 5HN",
          fullname: "",
          items: ["Paella valenciana", "Beer", "Cheese cake"]
        });
        const result: string =
          "Hey John Doe, your order won't be delivered at EC2Y 5HN";

        expect(action).toBe(result);
      });

      test("records an invalid delivery", () => {
        const action: string = customerService.entry({
          postcode: "",
          fullname: "John Doe",
          items: ["Paella valenciana", "Beer", "Cheese cake"]
        });
        const result: string =
          "Hey John Doe, your order won't be delivered at EC2Y 5HN";

        expect(action).toBe(result);
      });
    });
  });
});
