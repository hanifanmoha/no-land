"use client";

import { CodeBlock, dracula } from "react-code-blocks";
import {
  HStack,
  Box,
  VStack,
  Button,
  Select,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { uuid } from "uuidv4";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function Home() {
  return (
    <HStack>
      <Preview />
      <Mocker />
    </HStack>
  );
}

function Preview() {
  return (
    <Box w="50%" h="100vh" overflow="auto">
      <CodeBlock
        text={JSON.stringify(sampleCode, null, 2)}
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

interface IField {
  id: string;
  name: string;
  type: string;
}

function Mocker() {
  const [fields, setFields] = useState<IField[]>([]);

  function handleAddField() {
    const newField: IField = {
      id: uuid(),
      name: "field_name",
      type: "STRING",
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
    <VStack w="50%" h="100vh" py="24px" px="16px">
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

function MockerForm({
  field,
  onChange,
}: {
  field: IField;
  onChange: (field: IField) => void;
}) {
  function handleChange(key: string) {
    return function (e: any) {
      onChange({ ...field, [key]: e.target.value });
    };
  }

  return (
    <VStack>
      <FormControl>
        <FormLabel>Field Name</FormLabel>
        <Input value={field.name || ""} onChange={handleChange("name")} />
      </FormControl>
      <FormControl>
        <FormLabel>Type</FormLabel>
        <Select value={field.type} onChange={handleChange("type")}>
          <option value="STRING">STRING</option>
          <option value="NUMBER">NUMBER</option>
        </Select>
      </FormControl>
    </VStack>
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
