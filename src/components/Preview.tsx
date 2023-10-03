"use client";

import {
  convertFieldToEncoded,
  convertFieldToPayload,
  copyToClipboard,
} from "@/utils/utils";
import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Input, VStack } from "@chakra-ui/react";
import { useDebounce } from "@uidotdev/usehooks";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ReactJSONWithNoSSR = dynamic(() => import("react-json-view"), {
  ssr: false,
});

export default function Preview({ fields }: { fields: IField[] }) {
  const debouncedFields = useDebounce(fields, 300);
  const [generatedPayload, setGeneratedPayload] = useState<any>({});

  const locationOrigin =
    typeof window !== "undefined" ? window?.location?.origin : "";
  const generatedMocker: string = convertFieldToEncoded(fields, locationOrigin);

  useEffect(() => {
    async function regenerate() {
      setGeneratedPayload(convertFieldToPayload(debouncedFields));
    }
    regenerate();
  }, [debouncedFields]);

  function handleOpenAPI() {
    window.open(generatedMocker);
  }

  function handleCopy() {
    copyToClipboard(generatedMocker);
  }

  return (
    <Box
      w="50%"
      h="100vh"
      overflow="auto"
      bgColor={"blackAlpha.800"}
      position={"relative"}
    >
      <Box minHeight={"100vh"}>
        <ReactJSONWithNoSSR
          src={generatedPayload}
          name={false}
          theme={"monokai"}
          style={{ padding: "24px", minHeight: "100vh" }}
        />
      </Box>
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
          <Button leftIcon={<CopyIcon />} onClick={handleCopy}>
            Copy
          </Button>
          <Button leftIcon={<ExternalLinkIcon />} onClick={handleOpenAPI}>
            Go
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}
