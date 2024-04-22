import express, { Response } from "express"; // Import Response type from express
import axios from "axios"; // Import axios module

const lipa = express();

//routes
lipa.get("/pages/api/lipa", (req, res: Response) => {
  // Specify Response type for 'res'
  res.send("Hello World");
});

function access() {
  lipa.get("/access_token", async (req, res: Response) => {
    // Make the route handler async to use await
    try {
      //access token
      let url =
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"; // Define your URL
      let auth = Buffer.from(
        "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
      ).toString("base64"); // Use Buffer.from() instead of deprecated new Buffer()

      const response = await axios.get(url, {
        headers: {
          Authorization: "Basic " + auth, // Add a space after "Basic"
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
}

//listen
lipa.listen(8000, () => {
  console.log("Server is running on port 8000");
});
