// const axios = require("axios");
// const xml2js = require("xml2js");

// // const ledgerName = "PC";


// async function getVoucherData(voucherData) {

//   console.log("VoucherData", JSON.stringify(voucherData, null, 2));
//   const { ledgerName } = voucherData;


//   const tallyURL = "http://localhost:9000";
//   const xmlRequest = `
//   <ENVELOPE>
//     <HEADER>
//       <TALLYREQUEST>Export Data</TALLYREQUEST>
//     </HEADER>
//     <BODY>
//       <EXPORTDATA>
//         <REQUESTDESC>
//           <REPORTNAME>Ledger Vouchers</REPORTNAME>
//           <STATICVARIABLES>
//             <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
//             <LEDGERNAME>${ledgerName}</LEDGERNAME>
//             <EXPLODEALLLEVELS>Yes</EXPLODEALLLEVELS>
//           </STATICVARIABLES>
//           <TDL>
//             <TDLMESSAGE>
//               <COLLECTION NAME="MyLedgerVouchers" ISMODIFY="Yes">
//                 <TYPE>Voucher</TYPE>
//                 <FETCH>DATE,LEDGERNAME,AMOUNT,NARRATION</FETCH>
//               </COLLECTION>
//             </TDLMESSAGE>
//           </TDL>
//         </REQUESTDESC>
//       </EXPORTDATA>
//     </BODY>
//   </ENVELOPE>`;

//   try {
//     const response = await axios.post(tallyURL, xmlRequest, {
//       headers: {
//         "Content-Type": "application/xml",
//       },
//     });

//     const result = await xml2js.parseStringPromise(response.data);
//     console.log("Voucher Data:", JSON.stringify(result, null, 2));
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// getVoucherData();
// module.exports = {getVoucherData}








// const axios = require("axios");
// const xml2js = require("xml2js");

// async function getAllLedgers() {
//   const tallyURL = "http://localhost:9000";
//   const xmlRequest = `
//   <ENVELOPE>
//     <HEADER>
//       <TALLYREQUEST>Export Data</TALLYREQUEST>
//     </HEADER>
//     <BODY>
//       <EXPORTDATA>
//         <REQUESTDESC>
//           <REPORTNAME>List of Accounts</REPORTNAME>
//           <STATICVARIABLES>
//             <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
//           </STATICVARIABLES>
//         </REQUESTDESC>
//       </EXPORTDATA>
//     </BODY>
//   </ENVELOPE>`;

//   try {
//     const response = await axios.post(tallyURL, xmlRequest, {
//       headers: { "Content-Type": "application/xml" },
//     });

//     const result = await xml2js.parseStringPromise(response.data);
//     const ledgers = result.ENVELOPE.BODY[0].IMPORTDATA[0].REQUESTDATA[0].TALLYMESSAGE
//       .filter(msg => msg.LEDGER)
//       .map(msg => msg.LEDGER[0].NAME[0]);
    
//     return ledgers;
//   } catch (error) {
//     console.error("Error fetching ledgers:", error);
//     return [];
//   }
// }

// async function getVoucherData(ledgerName) {
//   const tallyURL = "http://localhost:9000";
//   const xmlRequest = `
//   <ENVELOPE>
//     <HEADER>
//       <TALLYREQUEST>Export Data</TALLYREQUEST>
//     </HEADER>
//     <BODY>
//       <EXPORTDATA>
//         <REQUESTDESC>
//           <REPORTNAME>Ledger Vouchers</REPORTNAME>
//           <STATICVARIABLES>
//             <SVEXPORTFORMAT>$$SysName:XML</SVEXPORTFORMAT>
//             <LEDGERNAME>${ledgerName}</LEDGERNAME>
//             <EXPLODEALLLEVELS>Yes</EXPLODEALLLEVELS>
//           </STATICVARIABLES>
//         </REQUESTDESC>
//       </EXPORTDATA>
//     </BODY>
//   </ENVELOPE>`;

//   try {
//     const response = await axios.post(tallyURL, xmlRequest, {
//       headers: { "Content-Type": "application/xml" },
//     });

//     const result = await xml2js.parseStringPromise(response.data);
//     return result.ENVELOPE;
//   } catch (error) {
//     console.error(`Error fetching voucher data for ${ledgerName}:`, error);
//     return null;
//   }
// }

// async function getAllLedgersVoucherData() {
//   const ledgers = await getAllLedgers();
//   const allVoucherData = {};

//   for (const ledger of ledgers) {
//     const voucherData = await getVoucherData(ledger);
//     if (voucherData) {
//       allVoucherData[ledger] = voucherData;
//     }
//   }

//   console.log("All Ledgers Voucher Data:", JSON.stringify(allVoucherData, null, 2));
//   return allVoucherData;
// }

// getAllLedgersVoucherData();
