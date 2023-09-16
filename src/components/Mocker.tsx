import {
  Box,
  VStack,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { uuid } from "uuidv4";
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
  // const [fields, setFields] = useState<IField[]>([]);

  function handleAddField() {
    const newField: IField = {
      id: uuid(),
      name: faker.animal.type(),
      type: defaultMockOption,
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
          <AccordionItem key={field.id}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {field.name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <MockerForm field={field} onChange={handleUpdateField} />
            </AccordionPanel>
          </AccordionItem>
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
