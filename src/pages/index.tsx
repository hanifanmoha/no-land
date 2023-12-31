"use client";

import { HStack } from "@chakra-ui/react";
import Preview from "@/components/Preview";
import Mocker from "@/components/Mocker";
import { useState } from "react";
import { v4 } from "uuid";
import Head from "next/head";
import favicon from "../app/favicon.ico";

export default function Home() {
  const [fields, setFields] = useState<IField[]>(exampleFields);

  console.log(favicon);

  return (
    <>
      <Head>
        <title>No-Land | The Golden City Does Exist!</title>
        <link rel="shortcut icon" href={favicon.src} />
      </Head>
      <HStack>
        <Preview fields={fields} />
        <Mocker fields={fields} setFields={setFields} />
      </HStack>
    </>
  );
}

const initialFields: IField[] = [
  {
    id: v4(),
    name: "<root>",
    is_root: true,
    field_type: "object",
    array_length: undefined,
    faker_type: undefined,
    children: [],
  },
];

const exampleFields: IField[] = [
  {
    id: v4(),
    name: "<root>",
    is_root: true,
    field_type: "object",
    array_length: undefined,
    faker_type: undefined,
    children: [
      {
        id: v4(),
        name: "length",
        is_root: false,
        field_type: "field",
        array_length: undefined,
        faker_type: "number.int",
        children: [],
      },
      {
        id: v4(),
        name: "users",
        is_root: false,
        field_type: "array",
        array_length: {
          type: "fixed",
          min: 20,
          max: 20,
        },
        faker_type: "internet.userName",
        children: [
          {
            id: v4(),
            name: "users",
            is_root: false,
            field_type: "object",
            array_length: undefined,
            faker_type: undefined,
            children: [
              {
                id: v4(),
                name: "username",
                is_root: false,
                field_type: "field",
                array_length: undefined,
                faker_type: "internet.userName",
                children: [],
              },
              {
                id: v4(),
                name: "default_password",
                is_root: false,
                field_type: "field",
                array_length: undefined,
                faker_type: "string.alphanumeric",
                children: [],
              },
              {
                id: v4(),
                name: "first_name",
                is_root: false,
                field_type: "field",
                array_length: undefined,
                faker_type: "person.firstName",
                children: [],
              },
              {
                id: v4(),
                name: "favorite_number",
                is_root: false,
                field_type: "field",
                array_length: undefined,
                faker_type: "number.int",
                children: [],
              },
              {
                id: v4(),
                name: "jobs",
                is_root: false,
                field_type: "array",
                array_length: {
                  type: "random",
                  min: 1,
                  max: 5,
                },
                faker_type: undefined,
                children: [
                  {
                    id: v4(),
                    name: "job",
                    is_root: false,
                    field_type: "field",
                    array_length: undefined,
                    faker_type: "person.jobTitle",
                    children: [],
                  },
                ],
              },
              {
                id: v4(),
                name: "created",
                is_root: false,
                field_type: "object",
                array_length: undefined,
                faker_type: undefined,
                children: [
                  {
                    id: v4(),
                    name: "created_date",
                    is_root: false,
                    field_type: "field",
                    array_length: undefined,
                    faker_type: "date.anytime",
                    children: [],
                  },
                  {
                    id: v4(),
                    name: "created_by",
                    is_root: false,
                    field_type: "field",
                    array_length: undefined,
                    faker_type: "internet.email",
                    children: [],
                  },
                ],
              },
              {
                id: v4(),
                name: "updated",
                is_root: false,
                field_type: "object",
                array_length: undefined,
                faker_type: undefined,
                children: [
                  {
                    id: v4(),
                    name: "updated_date",
                    is_root: false,
                    field_type: "field",
                    array_length: undefined,
                    faker_type: "date.anytime",
                    children: [],
                  },
                  {
                    id: v4(),
                    name: "updated_by",
                    is_root: false,
                    field_type: "field",
                    array_length: undefined,
                    faker_type: "internet.email",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
