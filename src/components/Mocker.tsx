import { VStack, Button, Box, HStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import MockerForm from "./MockerForm";

export default function Mocker({
  fields,
  setFields,
}: {
  fields: IField[];
  setFields: Dispatch<SetStateAction<IField[]>>;
}) {
  const [expanded, setExpanded] = useState<string[]>([]);

  function handleUpdateField(field: IField) {
    setFields((currents) => {
      return currents.map((currentField) => {
        if (currentField.id === field.id) return field;
        return currentField;
      });
    });
  }

  function handleCollapseAll() {
    setExpanded([]);
  }

  function handleToggleExpand(id: string) {
    setExpanded((current) => {
      if (current.indexOf(id) >= 0) {
        return current.filter((x) => x !== id);
      } else {
        return [...current, id];
      }
    });
  }

  return (
    <VStack w="50%" h="100vh" overflow="auto" position={"relative"}>
      <Box
        zIndex={100}
        position={"sticky"}
        top={0}
        width={"100%"}
        padding={"16px"}
        backgroundColor={"white"}
        borderBottom={"1px"}
        borderStyle={"solid"}
        borderColor={"gray.100"}
      >
        <HStack justifyContent={"flex-end"}>
          <Button onClick={handleCollapseAll}>Collapse All</Button>
        </HStack>
      </Box>
      <Box py="24px" px="16px" width={"100%"}>
        {fields.map((field) => (
          <MockerForm
            expanded={expanded}
            onToggleExpand={handleToggleExpand}
            key={field.id}
            field={field}
            onChange={handleUpdateField}
            level={0}
          />
        ))}
      </Box>
    </VStack>
  );
}
