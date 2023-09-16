import { mockOptions } from "@/utils/utils";
import {
  VStack,
  Select,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

export default function MockerForm({
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
          {mockOptions.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.label}
            </option>
          ))}
        </Select>
      </FormControl>
    </VStack>
  );
}
