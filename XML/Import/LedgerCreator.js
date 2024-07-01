const axios = require("axios");
const xml2js = require("xml2js");

// // Usage
// const account = "Cash";
// const date = "20240401";
// const bankName = "Cash";
// const narration = "Payment for watch from IDFC Bank";
// const amount = 400.0;
// const ledgerName = "Bank";
// const ledgerGroup = "Fixed Assets";
// const company = "CpS";


async function createLedger(data) {
  // Extract the nested ledgerData object
  const ledgerData = data.ledgerData;

  // Log the extracted ledgerData object
  console.log("ledgerData:", JSON.stringify(ledgerData, null, 2));

  // Destructure the required properties from the nested ledgerData object
  const { ledgerName, ledgerGroup } = ledgerData;

  console.log("ledgerName:", ledgerName);
  console.log("ledgerGroup:", ledgerGroup);

  const tallyURL = "http://localhost:9000";
  const xmlRequest = `
  <ENVELOPE>
      <HEADER>
          <TALLYREQUEST>Import Data</TALLYREQUEST>
      </HEADER>
      <BODY>
          <IMPORTDATA>
              <REQUESTDESC>
                  <REPORTNAME>All Masters</REPORTNAME>
              </REQUESTDESC>
              <REQUESTDATA>
                  <TALLYMESSAGE xmlns:UDF="TallyUDF">
                      <LEDGER NAME="${ledgerName}" RESERVEDNAME="">
                          <NAME.LIST>
                              <NAME>${ledgerName}</NAME>
                          </NAME.LIST>
                          <PARENT>${ledgerGroup}</PARENT>
                          <ISBILLWISEON>Yes</ISBILLWISEON>
                      </LEDGER>
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

    const result = await xml2js.parseStringPromise(response.data);
    console.log("createLedger:", JSON.stringify(result, null, 2));

    if (result.ENVELOPE.BODY[0].DATA[0].LINEERROR) {
      throw new Error(
        `Create ledger failed: ${result.ENVELOPE.BODY[0].DATA[0].LINEERROR[0]}`
      );
    } else {
      console.log("Ledger created successfully.");
    }
  } catch (error) {
    console.error("Error:", error.message || error);
  }
}

module.exports = { createLedger };
