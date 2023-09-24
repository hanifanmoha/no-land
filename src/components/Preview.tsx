import {
  convertFieldToEncoded,
  convertFieldToPayload,
  copyToClipboard,
  mockOptions,
} from "@/utils/utils";
import { CopyIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Input, VStack } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import dynamic from "next/dynamic";

const ReactJSONWithNoSSR = dynamic(() => import("react-json-view"), {
  ssr: false,
});

export default function Preview({ fields }: { fields: IField[] }) {
  const payload: any = convertFieldToPayload(fields);
  const generatedMocker: string = convertFieldToEncoded(fields);

  return (
    <Box
      w="50%"
      h="100vh"
      overflow="auto"
      bgColor={"blackAlpha.800"}
      position={"relative"}
    >
      <ReactJSONWithNoSSR
        src={payload}
        name={false}
        theme={"monokai"}
        style={{ padding: "24px" }}
      />
      <Box
        position={"sticky"}
        bottom={"0px"}
        zIndex={100}
        bgColor={"gray.800"}
        padding={"16px"}
        borderTop={"1px"}
        borderStyle={"solid"}
        borderColor={"gray.500"}
      >
        <HStack justifyContent={"flex-start"} flex={1}>
          <Input
            bgColor={"gray.900"}
            value={generatedMocker}
            color={"white"}
            onChange={() => {}}
          />
          <Button
            leftIcon={<CopyIcon />}
            onClick={() => copyToClipboard(generatedMocker)}
          >
            Copy
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
