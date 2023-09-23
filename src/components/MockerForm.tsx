import { mockOptions } from "@/utils/utils";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { HStack, Icon } from "@chakra-ui/react";
import { FaBars, FaProjectDiagram } from "react-icons/fa";
import {
  VStack,
  Select,
  FormControl,
  FormLabel,
  Input,
  AccordionPanel,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
} from "@chakra-ui/react";

export default function MockerForm({
  field,
  onChange,
  level,
}: {
  field: IField;
  onChange: (field: IField) => void;
  level: number;
}) {
  function handleChildChange(childId: string) {
    return function (child: IField) {
      const newField: IField = {
        ...field,
        children: (field.children || []).map((f) => {
          if (f.id === childId) {
            return child;
          } else {
            return f;
          }
        }),
      };
      onChange(newField);
    };
  }

  function handleChange(key: string) {
    return function (e: any) {
      onChange({ ...field, [key]: e.target.value });
    };
  }

  function renderChildren() {
    if (field.field_type === "object" || field.field_type === "array") {
      return (field.children || []).map((child) => (
        <MockerForm
          key={child.id}
          field={child}
          onChange={handleChildChange(child.id)}
          level={level + 1}
        />
      ));
    }
  }

  return (
    <>
      <AccordionItem key={field.id}>
        <h2>
          <Box display="flex">
            <AccordionButton>
              <AccordionIcon />
              {[...Array(level)].map((_, i) => (
                <Box key={i} mr="32px">
                  {/* <ArrowForwardIcon/> */}
                </Box>
              ))}
              <Box as="span" mr="8px" textAlign="left">
                {field.name}
              </Box>
              {field.field_type === "object" && <Icon as={FaProjectDiagram} />}
              {field.field_type === "array" && <Icon as={FaBars} />}
            </AccordionButton>
          </Box>
        </h2>
        <AccordionPanel
          pb={4}
          backgroundColor="blackAlpha.50"
          borderRadius="lg"
          padding="42px"
        >
          <VStack spacing="32px">
            <FormControl>
              <FormLabel>Field Name</FormLabel>
              <Input value={field.name || ""} onChange={handleChange("name")} />
            </FormControl>
            <FormControl>
              <FormLabel>Field Type</FormLabel>
              <Select
                value={field.field_type}
                onChange={handleChange("field_type")}
              >
                <option value="field">Field</option>
                <option value="object">Object</option>
                <option value="array">Array</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Faker Type</FormLabel>
              <Select
                value={field.faker_type}
                onChange={handleChange("faker_type")}
              >
                {mockOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </VStack>
        </AccordionPanel>
        {renderChildren()}
      </AccordionItem>
    </>
  );
}
