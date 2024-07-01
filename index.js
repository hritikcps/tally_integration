const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { createLedger } = require("./XML/Import/LedgerCreator");
const { createPaymentVoucher } = require("./XML/Import/PaymentVoucherCreator");
// const {getVoucherData}= require("./XML/Export/index")

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.post("/ledger", async (req, res) => {
  const ledgerData = req.body;
  // console.log("Ledger Details:", req.body);
  try {
    // console.log(ledgerData);
    await createLedger({ledgerData});
    res.status(200).send("Ledger created successfully");
  } catch (error) {
    console.error("Error creating ledger:", error);
    res.status(500).send("Error creating ledger");
  }
});

app.post("/voucher", async (req, res) => {
  const voucherData = req.body;
  console.log("Voucher Details:", req.body);
  try {
    // console.log(ledgerData);
    await createPaymentVoucher({voucherData});
    res.status(200).send("Voucher created successfully");
  } catch (error) {
    console.error("Error creating Voucher:", error);
    res.status(500).send("Error creating Voucher");
  }
});

// app.post("/getVoucherData", async(req,res)=>{
//     const getVoucherData = req.body;
//     console.log("Get Voucher Details:", req.body);
//     try{
//         const voucherData = await getVoucherData(getVoucherDataRequest);
//         res.status(200).json(voucherData);
//     }catch(error){
//         console.error("Error fetching Voucher Data:", error);
//         res.status(500).send("Error fetching Voucher Data");
//     }

// })

//listen port
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running  on port ${port}`);
});