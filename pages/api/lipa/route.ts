import express, { Request, Response } from "express";
import axios from "axios";
import fs from "fs";
import moment from "moment";

const router = express.Router();

// Sample API route
router.get("/", (req: Request, res: Response) => {
  res.json({ message: "This is a sample API route." });
  console.log("This is a sample API route.");
});

router.get("/", (req: Request, res: Response) => {
  getAccessToken()
    .then((accessToken: string) => {
      res.json({ message: "😀 Your access token is " + accessToken });
    })
    .catch((error: any) => console.log(error));
});

async function getAccessToken(): Promise<string> {
  const consumer_key = process.env.CONSUMER_KEY as string; // REPLACE IT WITH YOUR CONSUMER KEY
  const consumer_secret = process.env.CONSUMER_SECRET as string; // REPLACE IT WITH YOUR CONSUMER SECRET
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

router.post("/api/lipa/stkpush", (req: Request, res: Response) => {
  let phoneNumber: string = req.body.phone;
  const accountNumber: string = req.body.accountNumber;
  const amount: number = req.body.amount;

  if (phoneNumber.startsWith("0")) {
    phoneNumber = "254" + phoneNumber.slice(1);
  }

  getAccessToken()
    .then((accessToken: string) => {
      const url: string =
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
      const auth: string = "Bearer " + accessToken;
      const timestamp: string = moment().format("YYYYMMDDHHmmss");
      const password: string = Buffer.from(
        "174379" +
          "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
          timestamp
      ).toString("base64");

      axios
        .post(
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
              "https://249e-105-60-226-239.ngrok-free.app/api/callback",
            AccountReference: accountNumber,
            TransactionDesc: "Mpesa Daraja API stk push test",
          },
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          res.status(200).json({
            msg: "Request is successful done ✔✔. Please enter mpesa pin to complete the transaction",
            status: true,
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            msg: "Request failed",
            status: false,
          });
        });
    })
    .catch((error: any) => console.log(error));
});

router.post("/api/lipa/callback", (req: Request, res: Response) => {
  console.log("STK PUSH CALLBACK");
  const body = req.body;
  const stkCallback = body?.Body?.stkCallback;

  if (!stkCallback) {
    res.status(400).json({ msg: "Invalid request body" });
    return;
  }

  const merchantRequestID: string = stkCallback.MerchantRequestID;
  const checkoutRequestID: string = stkCallback.CheckoutRequestID;
  const resultCode: number = stkCallback.ResultCode;
  const resultDesc: string = stkCallback.ResultDesc;
  const callbackMetadata: any[] = stkCallback.CallbackMetadata;
  const amount: number = callbackMetadata[0]?.Value;
  const mpesaReceiptNumber: string = callbackMetadata[1]?.Value;
  const transactionDate: string = callbackMetadata[3]?.Value;
  const phoneNumber: string = callbackMetadata[4]?.Value;

  console.log("MerchantRequestID:", merchantRequestID);
  console.log("CheckoutRequestID:", checkoutRequestID);
  console.log("ResultCode:", resultCode);
  console.log("ResultDesc:", resultDesc);

  console.log("Amount:", amount);
  console.log("MpesaReceiptNumber:", mpesaReceiptNumber);
  console.log("TransactionDate:", transactionDate);
  console.log("PhoneNumber:", phoneNumber);

  const json: string = JSON.stringify(req.body);
  fs.writeFile("stkcallback.json", json, "utf8", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("STK PUSH CALLBACK STORED SUCCESSFULLY");
  });

  res.status(200).send("Callback received successfully");
});

// Other API routes go here...

export default router;
