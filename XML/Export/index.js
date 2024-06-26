const axios = require("axios");
const xml2js = require("xml2js");

async function fetchVoucherData() {
    const tallyURL = "http://localhost:9000";
    const xmlRequest = `
  <ENVELOPE>
    <HEADER>
      <TALLYREQUEST>Export Data</TALLYREQUEST>
    </HEADER>
    <BODY>
      <EXPORTDATA>
        <REQUESTDESC>
          <REPORTNAME>Ledger Vouchers</REPORTNAME>
          <STATICVARIABLES>
            <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
            <LEDGERNAME>Ac</LEDGERNAME>
            <EXPLODEALLLEVELS>Yes</EXPLODEALLLEVELS>
          </STATICVARIABLES>
          <TDL>
            <TDLMESSAGE>
              <COLLECTION NAME="MyLedgerVouchers" ISMODIFY="Yes">
                <TYPE>Voucher</TYPE>
                <FETCH>DATE,LEDGERNAME,AMOUNT,NARRATION</FETCH>
              </COLLECTION>
            </TDLMESSAGE>
          </TDL>
        </REQUESTDESC>
      </EXPORTDATA>
    </BODY>
  </ENVELOPE>`;

    try {
        const response = await axios.post(tallyURL, xmlRequest, {
            headers: {
                "Content-Type": "application/xml",
            },
        });

        const result = await xml2js.parseStringPromise(response.data);
        console.log("Voucher Data:", JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("Error:", error);
    }
}

fetchVoucherData();
