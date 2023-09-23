import { faker } from "@faker-js/faker";

export const defaultMockOption = "string.alphanumeric";

export const mockOptions: IMockOptions[] = [
  // Number
  {
    label: "Number : Int",
    key: "number.int",
    func: faker.number.int,
    options: [],
  },
  {
    label: "Number : Float",
    key: "number.float",
    func: faker.number.float,
    options: [],
  },
  // Person
  {
    label: "Person : First name",
    key: "person.firstName",
    func: faker.person.firstName,
    options: [],
  },
  {
    label: "Person : Full name",
    key: "person.fullName",
    func: faker.person.fullName,
    options: [],
  },
  {
    label: "Person : Job title",
    key: "person.jobTitle",
    func: faker.person.jobTitle,
    options: [],
  },
  // String
  {
    label: "String : Alphanumeric",
    key: "string.alphanumeric",
    func: faker.string.alphanumeric,
    options: [20],
  },
  // Internet
  {
    label: "Internet : Username",
    key: "internet.userName",
    func: faker.internet.userName,
    options: [],
  },
  {
    label: "Internet : Email",
    key: "internet.email",
    func: faker.internet.email,
    options: [],
  },
  // Animal
  {
    label: "Animal : Type",
    key: "animal.type",
    func: faker.animal.type,
    options: [],
  },
  // Date
  {
    label: "Date : Anytime",
    key: "date.anytime",
    func: faker.date.anytime,
    options: [],
  },
];
