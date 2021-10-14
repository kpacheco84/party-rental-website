import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class EventTyp {
  readonly id: string;
  readonly name?: string;
  readonly Orders?: (Orders | null)[];
  constructor(init: ModelInit<EventTyp>);
  static copyOf(source: EventTyp, mutator: (draft: MutableModel<EventTyp>) => MutableModel<EventTyp> | void): EventTyp;
}

export declare class Orders {
  readonly id: string;
  readonly orderDate?: string;
  readonly fromDate?: string;
  readonly thruDate?: string;
  readonly eventName?: string;
  readonly address_line1?: string;
  readonly address_line2?: string;
  readonly city?: string;
  readonly state?: string;
  readonly zip?: number;
  readonly secondaryContact?: string;
  readonly customerNotes?: string;
  readonly customersID?: string;
  readonly eventtypID?: string;
  readonly OrderDetails?: (OrderDetail | null)[];
  constructor(init: ModelInit<Orders>);
  static copyOf(source: Orders, mutator: (draft: MutableModel<Orders>) => MutableModel<Orders> | void): Orders;
}

export declare class OrderDetail {
  readonly id: string;
  readonly ordersID?: string;
  readonly productsID?: string;
  readonly qty?: number;
  readonly amount?: number;
  constructor(init: ModelInit<OrderDetail>);
  static copyOf(source: OrderDetail, mutator: (draft: MutableModel<OrderDetail>) => MutableModel<OrderDetail> | void): OrderDetail;
}

export declare class Company {
  readonly id: string;
  readonly nam?: string;
  readonly Customers?: Customers;
  constructor(init: ModelInit<Company>);
  static copyOf(source: Company, mutator: (draft: MutableModel<Company>) => MutableModel<Company> | void): Company;
}

export declare class Customers {
  readonly id: string;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly phone?: string;
  readonly preferredEmail?: string;
  readonly Orders?: (Orders | null)[];
  readonly userID?: string;
  constructor(init: ModelInit<Customers>);
  static copyOf(source: Customers, mutator: (draft: MutableModel<Customers>) => MutableModel<Customers> | void): Customers;
}

export declare class UserType {
  readonly id: string;
  readonly name?: string;
  constructor(init: ModelInit<UserType>);
  static copyOf(source: UserType, mutator: (draft: MutableModel<UserType>) => MutableModel<UserType> | void): UserType;
}

export declare class Schedule {
  readonly id: string;
  constructor(init: ModelInit<Schedule>);
  static copyOf(source: Schedule, mutator: (draft: MutableModel<Schedule>) => MutableModel<Schedule> | void): Schedule;
}

export declare class Products {
  readonly id: string;
  readonly name?: string;
  readonly shortDesc?: string;
  readonly longDesc?: string;
  readonly length?: number;
  readonly width?: number;
  readonly height?: number;
  readonly size?: string;
  readonly qty?: number;
  readonly active?: boolean;
  readonly imagestorageID?: string;
  readonly OrderDetails?: (OrderDetail | null)[];
  readonly amount?: number;
  readonly incart?: number;
  constructor(init: ModelInit<Products>);
  static copyOf(source: Products, mutator: (draft: MutableModel<Products>) => MutableModel<Products> | void): Products;
}

export declare class Users {
  readonly id: string;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly username?: string;
  readonly cognitoID?: string;
  readonly Customers?: Customers;
  constructor(init: ModelInit<Users>);
  static copyOf(source: Users, mutator: (draft: MutableModel<Users>) => MutableModel<Users> | void): Users;
}