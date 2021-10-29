// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Payments, EventTyp, Orders, OrderDetail, Company, Customers, UserType, Schedule, Products, Users } = initSchema(schema);

export {
  Payments,
  EventTyp,
  Orders,
  OrderDetail,
  Company,
  Customers,
  UserType,
  Schedule,
  Products,
  Users
};