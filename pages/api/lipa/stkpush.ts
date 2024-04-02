import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import moment from "moment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      res.json({ message: "This is a sample API route." });
      console.log("This is a sample API route.");
    } else if (req.method === "POST") {
      const { body } = req;
      if (req.url === "/stkpush") {
        try {
          // Handle STK push request
          let phoneNumber: string = body.phone;
          const accountNumber: string = body.accountNumber;
          const amount: number = body.amount;

          if (phoneNumber.startsWith("0")) {
            phoneNumber = "254" + phoneNumber.slice(1);
          }

          const accessToken: string = await getAccessToken();
          const url: string =
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
          const auth: string = "Bearer " + accessToken;
          const timestamp: string = moment().format("YYYYMMDDHHmmss");
          const password: string = Buffer.from(
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
              PartyA: "600998",
              PartyB: "600000",
              PhoneNumber: phoneNumber,
              CallBackURL:
                "https://41a4-197-248-126-233.ngrok-free.app/callback",
              AccountReference: accountNumber,
              TransactionDesc: "Mpesa Daraja API stk push test",
            },
            {
              headers: {
                Authorization: auth,
              },
            }
          );
          console.log(response.data);
          res.status(200).json({
            msg: "Request is successful done ✔✔. Please enter mpesa pin to complete the transaction",
            status: true,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            msg: "Request failed",
            status: false,
          });
        }
      } else if (req.url === "/api/lipa/callback") {
        // Handle Lipa Na M-Pesa callback
        console.log("STK PUSH CALLBACK");
        const stkCallback = body?.Body?.stkCallback;

        if (!stkCallback) {
          res.status(400).json({ msg: "Invalid request body" });
          return;
        }

        // Handle callback and send response
        res.status(200).send("Callback received successfully");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal Server Error",
      status: false,
    });
  }
}

async function getAccessToken(): Promise<string> {
  const consumer_key = process.env.CONSUMER_KEY as string;
  const consumer_secret = process.env.CONSUMER_SECRET as string;
  const url: string =
    "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const auth: string =
    "Basic " +
    Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: auth,
      },
    });
    const accessToken: string = response.data.access_token;
    return accessToken;
  } catch (error) {
    throw error;
  }
}
