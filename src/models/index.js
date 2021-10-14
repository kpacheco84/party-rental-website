// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { EventTyp, Orders, OrderDetail, Company, Customers, UserType, Schedule, Products, Users } = initSchema(schema);

export {
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