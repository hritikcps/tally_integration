// require('dotenv').config();
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.send('Hello, world!');
// });


// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

//tally


const axios = require('axios');
const xml2js = require('xml2js');

async function fetchVoucherData() {
  const tallyURL = 'http://localhost:9000';
  const xmlRequest = `
        <ENVELOPE>
            <HEADER>
                <VERSION>1</VERSION>
                <TALLYREQUEST>Export</TALLYREQUEST>
                <TYPE>Collection</TYPE>
                <ID>VoucherCollection</ID>
            </HEADER>
            <BODY>
                <DESC>
                    <STATICVARIABLES>
                        <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
                        <SVFROMDATE>20240401</SVFROMDATE> <!-- Modify this date range as per your data -->
                        <SVTODATE>20240803</SVTODATE>
                        <EXPLODEALLLEVELS>Yes</EXPLODEALLLEVELS>
                    </STATICVARIABLES>
                    <TDL>
                        <TDLMESSAGE>
                            <COLLECTION NAME="VoucherCollection" ISMODIFY="NO" ISFIXED="NO" ISINITIALIZE="NO" ISOPTION="NO" ISINTERNAL="NO">
                                <TYPE>Voucher</TYPE>
                                <FETCH>DATE, GUID, VOUCHERTYPENAME, VOUCHERNUMBER, PARTYLEDGERNAME, AMOUNT, LEDGERENTRIES</FETCH>
                                <FILTERS>
                                    <MYVOUCHERTYPEFILTER>VOUCHERTYPENAME = $$String:"Payment" OR VOUCHERTYPENAME = $$String:"Receipt"</MYVOUCHERTYPEFILTER>
                                </FILTERS>
                                <CHILDREN>
                                    <COLLECTION NAME="LedgerEntries" ISMODIFY="NO">
                                        <TYPE>Ledger Entries</TYPE>
                                        <FETCH>LEDGERNAME, ISDEEMEDPOSITIVE, AMOUNT</FETCH>
                                    </COLLECTION>
                                </CHILDREN>
                            </COLLECTION>
                        </TDLMESSAGE>
                    </TDL>
                </DESC>
            </BODY>
        </ENVELOPE>
    `;

  try {
    const response = await axios.post(tallyURL, xmlRequest, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });

    const result = await xml2js.parseStringPromise(response.data);
    console.log('Voucher Data:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchVoucherData();