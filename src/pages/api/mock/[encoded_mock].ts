import { convertEncodedToField, convertFieldToPayload } from "@/utils/utils";
import type { NextApiRequest, NextApiResponse } from "next";

type MockQuery = {
  encoded_mock: string;
};

interface MockRequest extends NextApiRequest {
  query: MockQuery;
}

export default function handler(req: MockRequest, res: NextApiResponse<any>) {
  try {
    const encoded = req.query.encoded_mock;
    const fields = convertEncodedToField(encoded);
    const result = convertFieldToPayload(fields);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
}
