interface IField {
  id: string;
  is_root: boolean | undefined;
  name: string | undefined; // undefined for root
  field_type: "object" | "array" | "field";
  array_length:
    | {
        type: "fixed" | "random";
        min: number;
        max: number;
      }
    | undefined; // undefined for non array
  faker_type: string | undefined; // undefined for non field
  children: IField[] | undefined; // undefined for field
}

interface IMockOptions {
  label: string;
  key: string;
  func: (options: any) => any;
  options: any;
}
