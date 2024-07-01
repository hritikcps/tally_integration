const axios = require("axios");
const xml2js = require("xml2js");

async function createPaymentVoucher(data) {
  const voucherData = data.voucherData;
  console.log("voucherData:", JSON.stringify(voucherData, null, 2));

  // Destructure the required properties from the nested ledgerData object
  let { ledgerName, ledgerGroup, date, narration, amount } = voucherData;

  // Format date to YYYYMMDD
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObj.getDate()).slice(-2);
  date = `${year}${month}${day}`;

  // Log the destructured values
  console.log("ledgerName:", ledgerName);
  console.log("ledgerGroup:", ledgerGroup);
  console.log("date:", date);

  const tallyURL = "http://localhost:9000";

  const xmlRequest = `
    <ENVELOPE>
      <HEADER>
          <TALLYREQUEST>Import Data</TALLYREQUEST>
      </HEADER>
      <BODY>
          <IMPORTDATA>
              <REQUESTDESC>
                  <REPORTNAME>Vouchers</REPORTNAME>
              </REQUESTDESC>
              <REQUESTDATA>
                  <TALLYMESSAGE xmlns:UDF="TallyUDF">
                      <VOUCHER VCHTYPE="Payment" ACTION="Create">
                          <DATE>${date}</DATE>
                          <VOUCHERTYPENAME>Payment</VOUCHERTYPENAME>
                          <VOUCHERNUMBER>PV006</VOUCHERNUMBER>
                          <PARTYLEDGERNAME>Bank Accounts</PARTYLEDGERNAME>
                          <NARRATION>${narration}</NARRATION>
                          <ALLLEDGERENTRIES.LIST>
                              <LEDGERNAME>${ledgerName}</LEDGERNAME>
                              <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
                              <AMOUNT>-${amount}</AMOUNT>
                          </ALLLEDGERENTRIES.LIST>
                          <ALLLEDGERENTRIES.LIST>
                              <LEDGERNAME>${ledgerName}</LEDGERNAME>
                              <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
                              <AMOUNT>${amount}</AMOUNT>
                          </ALLLEDGERENTRIES.LIST>
                      </VOUCHER>
                  </TALLYMESSAGE>
              </REQUESTDATA>
          </IMPORTDATA>
      </BODY>
    </ENVELOPE>`;

  try {
    const response = await axios.post(tallyURL, xmlRequest, {
      headers: {
        "Content-Type": "application/xml",
      },
    });

    console.log("Create Payment Voucher Response:", response.data);
  } catch (error) {
    console.error("Error creating payment voucher:", error);
  }
}

module.exports = { createPaymentVoucher };