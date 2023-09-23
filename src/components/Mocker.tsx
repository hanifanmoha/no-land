import { VStack, Button, Accordion } from "@chakra-ui/react";
import { v4 } from "uuid";
import { AddIcon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction, useState } from "react";
import MockerForm from "./MockerForm";
import { defaultMockOption } from "@/utils/utils";
import { faker } from "@faker-js/faker";

export default function Mocker({
  fields,
  setFields,
}: {
  fields: IField[];
  setFields: Dispatch<SetStateAction<IField[]>>;
}) {
  function handleAddField() {
    const newField: IField = {
      id: v4(),
      name: `new_field_${faker.string.alphanumeric(10)}`,
      is_root: false,
      field_type: "field",
      array_length: undefined,
      faker_type: defaultMockOption,
      children: [],
    };
    setFields((currents) => [...currents, newField]);
  }

  function handleUpdateField(field: IField) {
    setFields((currents) => {
      return currents.map((currentField) => {
        if (currentField.id === field.id) return field;
        return currentField;
      });
    });
  }

  return (
    <VStack w="50%" h="100vh" py="24px" px="16px" overflow="auto">
      <Accordion w="100%" mb="24px" defaultIndex={[]} allowMultiple>
        {fields.map((field) => (
          <MockerForm
            key={field.id}
            field={field}
            onChange={handleUpdateField}
            level={0}
          />
        ))}
      </Accordion>
      <Button
        w="100%"
        leftIcon={<AddIcon />}
        colorScheme="teal"
        onClick={handleAddField}
      >
        Add New Field
      </Button>
    </VStack>
  );
}
