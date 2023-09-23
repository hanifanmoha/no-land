"use client";

import { mockOptions } from "@/utils/utils";
import { Box } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import ReactJson from "react-json-view";

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

export default function Preview({ fields }: { fields: IField[] }) {
  let payload: any = {};

  for (let field of fields) {
    const f = generateField(field);
    if (f.exist) {
      payload = f.value;
    }
  }

  console.log(payload);

  return (
    <Box w="50%" h="100vh" overflow="auto" bgColor={"blackAlpha.200"}>
      <Box p="24px">
        <ReactJson src={payload} name={false} />
      </Box>
    </Box>
  );
}
