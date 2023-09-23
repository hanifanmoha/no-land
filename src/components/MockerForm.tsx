import { createNewField, mockOptions } from "@/utils/utils";
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaBars, FaEllipsisV, FaProjectDiagram } from "react-icons/fa";
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
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DeleteIcon,
  SmallAddIcon,
} from "@chakra-ui/icons";

export default function MockerForm({
  field,
  onChange,
  onDelete,
  onMove,
  level,
  isFirstChild,
  isLastChild,
}: {
  field: IField;
  onChange: (field: IField) => void;
  onDelete?: (field: IField) => void;
  onMove?: (field: IField, dir: 1 | -1) => void;
  level: number;
  isFirstChild?: boolean;
  isLastChild?: boolean;
}) {
  function handleChildChange(child: IField) {
    const newField: IField = {
      ...field,
      children: (field.children || []).map((f) => {
        if (f.id === child.id) {
          return child;
        } else {
          return f;
        }
      }),
    };
    onChange(newField);
  }

  function handleChildDelete(child: IField) {
    const newField: IField = {
      ...field,
      children: (field.children || []).filter((f) => f.id !== child.id),
    };
    onChange(newField);
  }

  function handleChildMove(child: IField, dir: 1 | -1) {
    const currentIndex = (field.children || []).indexOf(child);
    const targetIndex = currentIndex + dir;
    if (targetIndex < 0 || targetIndex >= (field.children?.length || 0)) {
      return;
    }
    console.log(currentIndex, targetIndex);
    const newChildren = [...(field.children || [])];
    const tmp = newChildren[currentIndex];
    newChildren[currentIndex] = newChildren[targetIndex];
    newChildren[targetIndex] = tmp;
    const newField: IField = {
      ...field,
      children: newChildren,
    };
    onChange(newField);
  }

  function handleChange(key: string) {
    return function (e: any) {
      onChange({ ...field, [key]: e.target.value });
    };
  }

  function handleAddChild() {
    const newField: IField = {
      ...field,
      children: [...(field.children || []), createNewField()],
    };
    onChange(newField);
  }

  function handleDelete() {
    if (onDelete) onDelete(field);
  }

  function handleMove(dir: 1 | -1) {
    return function () {
      if (onMove) onMove(field, dir);
    };
  }

  function renderChildren() {
    if (field.field_type === "object" || field.field_type === "array") {
      return (field.children || []).map((child, index) => (
        <MockerForm
          key={child.id}
          field={child}
          onChange={handleChildChange}
          onDelete={handleChildDelete}
          onMove={handleChildMove}
          level={level + 1}
          isFirstChild={index === 0}
          isLastChild={index === (field.children || []).length - 1}
        />
      ));
    }
  }

  function renderMenu() {
    const showAddChild =
      field.field_type === "object" ||
      (field.field_type === "array" && field.children?.length === 0);

    return (
      <Menu>
        <MenuButton as={Box}>
          <Icon as={FaEllipsisV} />
        </MenuButton>
        <MenuList>
          {showAddChild && (
            <MenuItem onClick={handleAddChild}>
              <SmallAddIcon mr="12px" />
              Add Child
            </MenuItem>
          )}
          {!field.is_root && (
            <MenuItem onClick={handleDelete}>
              <DeleteIcon mr="12px" />
              Remove Item
            </MenuItem>
          )}
          {!field.is_root && !isFirstChild && (
            <MenuItem onClick={handleMove(-1)}>
              <ArrowUpIcon mr="12px" />
              Move Up
            </MenuItem>
          )}
          {!field.is_root && !isLastChild && (
            <MenuItem onClick={handleMove(1)}>
              <ArrowDownIcon mr="12px" />
              Move Down
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    );
  }

  return (
    <>
      <AccordionItem key={field.id}>
        {/* Toggle */}
        <h2>
          <Box display="flex" py="12px" alignItems="center">
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
            <Box px="12px" minW="40px" cursor="pointer">
              {renderMenu()}
            </Box>
          </Box>
        </h2>
        {/* Form */}
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
