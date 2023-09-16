import { faker } from "@faker-js/faker";

export const defaultMockOption = "string.alphanumeric";

export const mockOptions: IMockOptions[] = [
  // Number
  {
    label: "Number : Int",
    key: "number.int",
    func: faker.number.int,
  },
  {
    label: "Number : Float",
    key: "number.float",
    func: faker.number.float,
  },
  // Person
  {
    label: "Person : First name",
    key: "person.firstName",
    func: faker.person.firstName,
  },
  {
    label: "Person : Full name",
    key: "person.fullName",
    func: faker.person.fullName,
  },
  // String
  {
    label: "String : Alphanumeric",
    key: "string.alphanumeric",
    func: faker.string.alphanumeric,
  },
];
