type TOrder = {
  postcode: string,
  fullname: string,
  items: Array<string>
};

export class CustomerService {
  entry(details: TOrder): string {
    const order: Order = new Order(details.items);
    const msgOk: string =
      "Hey John Doe, your order will be delivered in 30mins at EC2Y 5HN";
    const msgKo: string =
      "Hey John Doe, your order won't be delivered at EC2Y 5HN";

    if (order.process()) {
      const orders: Orders = new Orders();
      orders.add(order);

      const bill: Bill = new Bill(details.fullname, details.items);

      if (bill.emit()) {
        const bills: Bills = new Bills();
        bills.add(bill);

        const delivery: Delivery = new Delivery(details.postcode);

        if (delivery.send()) {
          return msgOk;
        }
      }
    }

    return msgKo;
  }
}

class Order {
  _items: Array<string>;

  constructor(items: Array<string>): void {
    this._items = items;
  }

  process(): boolean {
    if (this._items.length > 0) {
      return true;
    }

    return false;
  }
}

class Bill {
  _name: string;
  _items: Array<string>;

  constructor(name: string, items: Array<string>): void {
    this._name = name;
    this._items = items;
  }

  emit(): boolean {
    if (this._name.length > 0) {
      return true;
    }

    return false;
  }
}

class Delivery {
  _postcode: string;

  constructor(postcode: string): void {
    this._postcode = postcode;
  }

  send(): boolean {
    if (this._postcode.length > 0 && this._postcode.length < 9) {
      return true;
    }

    return false;
  }
}

class Orders {
  _record: Array<Order>;

  constructor(): void {
    this._record = [];
  }

  add(order: Order): void {
    this._record.push(order);
  }
}

class Bills {
  _record: Array<Bill>;

  constructor(): void {
    this._record = [];
  }

  add(bill: Bill): void {
    this._record.push(bill);
  }
}
