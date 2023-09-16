interface IField {
  id: string;
  name: string;
  type: string;
}

interface IMockOptions {
  label: string;
  key: string;
  func: (options: any) => any;
}
