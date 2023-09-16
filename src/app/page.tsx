"use client";

import { HStack } from "@chakra-ui/react";
import Preview from "@/components/Preview";
import Mocker from "@/components/Mocker";
import { useState } from "react";

export default function Home() {
  const [fields, setFields] = useState<IField[]>([]);

  return (
    <HStack>
      <Preview fields={fields} />
      <Mocker fields={fields} setFields={setFields} />
    </HStack>
  );
}
