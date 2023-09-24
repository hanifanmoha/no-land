import { faker } from "@faker-js/faker";
import { v4 } from "uuid";
import { btoa, atob } from "js-base64";

export const defaultMockOption = "string.alphanumeric";

export function createNewField(): IField {
  return {
    id: v4(),
    name: `new_field_${faker.string.alphanumeric(10)}`,
    is_root: false,
    field_type: "field",
    array_length: {
      type: "random",
      min: 3,
      max: 10,
    },
    faker_type: defaultMockOption,
    children: [],
  };
}

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

function generateField(field: IField): { exist: boolean; value: any } {
  switch (field.field_type) {
    case "array": {
      const value: any[] = [];
      let len = field.array_length?.min || 0;
      if (field.array_length?.type === "random") {
        len = faker.number.int({
          min: field.array_length?.min || 0,
          max: field.array_length?.max || 10,
        });
      }
      if (field.children?.[0]) {
        for (let i = 0; i < len; i++) {
          const f = generateField(field.children?.[0]);
          if (f.exist) {
            value.push(f.value);
          }
        }
      }
      return { exist: true, value };
    }
    case "object": {
      const value: any = {};
      for (let child of field.children || []) {
        const f = generateField(child);
        if (f.exist) {
          value[child.name || "undefined_key"] = f.value;
        }
      }
      return { exist: true, value };
    }
    default: {
      const mocker = mockOptions.find((opt) => opt.key === field.faker_type);
      if (!mocker) {
        return { exist: false, value: undefined };
      }
      // @ts-expect-error: Ignore error for casting type to faker options
      const value = mocker.func(...((mocker.options || []) as any));
      return { exist: true, value };
    }
  }
}

export function convertFieldToPayload(fields: IField[]) {
  let payload: any = {};

  for (let field of fields) {
    const f = generateField(field);
    if (f.exist) {
      payload = f.value;
    }
  }

  return payload;
}

export function convertFieldToEncoded(fields: IField[], baseURL: string = "") {
  return baseURL + `/api/mock/` + btoa(JSON.stringify(fields));
}

export function convertEncodedToField(encodedString: string): IField[] {
  const decoded = atob(encodedString);
  return JSON.parse(decoded);
}

export function copyToClipboard(text: string) {
  var input = document.createElement("input");
  input.setAttribute("value", text);
  document.body.appendChild(input);
  input.select();
  const result = document.execCommand("copy");
  document.body.removeChild(input);
  return result;
}
