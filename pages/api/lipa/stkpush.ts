// Import necessary modules
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Retrieve PartyA (phone) and Amount from the request body
    const { PartyA, Amount } = req.body;
    const accessToken: string = await getAccessToken();

    // Make API call to Safaricom MPesa API
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: 174379,
        Password:
          "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwNDIyMTQyMzAx",
        Timestamp: "20240422142301",
        TransactionType: "CustomerPayBillOnline",
        Amount: Amount, // Use Amount from the request body
        PartyA: PartyA, // Use PartyA (phone) from the request body
        PartyB: PartyA,
        PhoneNumber: PartyA, // Use PartyA (phone) from the request body
        CallBackURL: "https://nova-commerce.vercel.app/callbackurl",
        AccountReference: "CompanyXLTD",
        TransactionDesc: "Payment of X",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the access token
        },
      }
    );

    // Check response status and send appropriate response
    if (response.status === 200) {
      res.status(200).json({ message: "Payment successful!" });
    } else {
      res
        .status(400)
        .json({ error: "Payment failed. Please try again later." });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Internal server error" });
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
