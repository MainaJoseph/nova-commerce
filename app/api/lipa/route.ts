// pages/api/lipa/stkpush.ts
import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
import moment from "moment";

// Assuming getAccessToken is adjusted or defined elsewhere to be used here
async function getAccessToken(): Promise<string> {
  const consumer_key = process.env.CONSUMER_KEY;
  const consumer_secret = process.env.CONSUMER_SECRET;
  const url: string =
    "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const auth: string =
    "Basic " +
    Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

  try {
    const response = await axios.get(url, { headers: { Authorization: auth } });
    return response.data.access_token;
  } catch (error) {
    throw new Error("Failed to get access token");
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let phoneNumber: string = req.body.phone;
    const accountNumber: string = req.body.accountNumber;
    const amount: number = req.body.amount;

    if (phoneNumber.startsWith("0")) {
      phoneNumber = "254" + phoneNumber.slice(1);
    }

    try {
      const accessToken = await getAccessToken();
      const url =
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
      const auth = "Bearer " + accessToken;
      const timestamp = moment().format("YYYYMMDDHHmmss");
      const password = Buffer.from(
        "174379" +
          "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
          timestamp
      ).toString("base64");

      const response = await axios.post(
        url,
        {
          BusinessShortCode: "174379",
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: amount,
          PartyA: "600989",
          PartyB: "600000",
          PhoneNumber: phoneNumber,
          CallBackURL:
            "https://249e-105-60-226-239.ngrok-free.app/api/callback",
          AccountReference: accountNumber,
          TransactionDesc: "Payment Description",
        },
        {
          headers: { Authorization: auth },
        }
      );

      res.status(200).json({
        message:
          "Request is successful. Please enter M-PESA pin to complete the transaction",
        data: response.data,
        status: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Request failed",
        status: false,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
