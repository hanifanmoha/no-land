import { mockOptions } from "@/utils/utils";
import { Box } from "@chakra-ui/react";
import { CodeBlock, dracula } from "react-code-blocks";

export default function Preview({ fields }: { fields: IField[] }) {
  const payload: { [key: string]: any } = {};

  for (let field of fields) {
    const mocker = mockOptions.find((opt) => opt.key === field.type);
    if (!mocker) continue;
    payload[field.name] = mocker.func({});
  }

  return (
    <Box w="50%" h="100vh" overflow="auto">
      <CodeBlock
        text={JSON.stringify(payload, null, 2)}
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
