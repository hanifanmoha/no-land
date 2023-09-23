import { mockOptions } from "@/utils/utils";
import { Box } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import { CodeBlock, dracula } from "react-code-blocks";

function generateField(field: IField): { exist: boolean; value: any } {
  switch (field.field_type) {
    case "array": {
      const value: any[] = [];
      let len = field.array_length?.min || 0;
      if (field.array_length?.type === "random") {
        len = faker.number.int({
          min: 2,
          max: 3,
          // min: field.array_length?.min || 0,
          // max: field.array_length?.max || 10,
        });
      }
      console.log("rendering array wiht len", len, field.array_length);
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

export default function Preview({ fields }: { fields: IField[] }) {
  let payload: any = {};

  for (let field of fields) {
    const f = generateField(field);
    if (f.exist) {
      payload = f.value;
    }
  }

  return (
    <Box w="50%" h="100vh" overflow="auto">
      <CodeBlock
        text={JSON.stringify(payload, null, 2)}
        language={`json`}
        showLineNumbers={true}
        theme={dracula}
        customStyle={{
          minHeight: "100%",
          minWidth: "100%",
        }}
      />
    </Box>
  );
}

const sampleCode = {
  page: 10,
  data: [...Array(10)].map((x) => ({
    id: 5340,
    uid: "15ef72bf-5905-438d-89c4-c80ad676d1a6",
    password: "c73P8e4YD1",
    first_name: "Zane",
    last_name: "Quitzon",
    username: "zane.quitzon",
    email: "zane.quitzon@email.com",
    avatar:
      "https://robohash.org/dolorquidemqui.png?size=300x300\u0026set=set1",
    gender: "Genderfluid",
    phone_number: "+679 (122) 592-2197 x8260",
    social_insurance_number: "189554165",
    date_of_birth: "1979-01-13",
    employment: { title: "Retail Analyst", key_skill: "Confidence" },
    address: {
      city: "South Dontemouth",
      street_name: "Mica Extension",
      street_address: "174 Lueilwitz Corners",
      zip_code: "55989",
      state: "Colorado",
      country: "United States",
      coordinates: { lat: -50.02334617361465, lng: -53.03818889723115 },
    },
    credit_card: { cc_number: "4593346671399" },
    subscription: {
      plan: "Professional",
      status: "Pending",
      payment_method: "Credit card",
      term: "Annual",
    },
  })),
};
