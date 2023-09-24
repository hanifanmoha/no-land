import { convertEncodedToField, convertFieldToPayload } from "@/utils/utils";
import type { NextApiRequest, NextApiResponse } from "next";

type MockQuery = {
  encoded_mock: string;
};

interface MockRequest extends NextApiRequest {
  query: MockQuery;
}

export default function handler(req: MockRequest, res: NextApiResponse<any>) {
  let encoded, fields, result, errMessage, err;

  try {
    encoded = req.query.encoded_mock;
  } catch (error) {
    errMessage = "get encoded field";
    err = error;
  }

  try {
    fields = convertEncodedToField(encoded!);
  } catch (error) {
    errMessage = "get encoded field";
    err = error;
  }

  try {
    result = convertFieldToPayload(fields!);
  } catch (error) {
    errMessage = "get encoded field";
    err = error;
  }

  res.status(200).json({
    encoded,
    fields,
    result,
    errMessage,
    err,
  });
}
