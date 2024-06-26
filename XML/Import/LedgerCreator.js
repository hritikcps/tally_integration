const axios = require('axios');

class LedgerCreator {
    constructor(tallyURL = "http://localhost:9000") {
        this.tallyURL = tallyURL;
    }

    async createLedger(ledgerName, ledgerGroup, company) {
        const xmlRequest = `    
        <ENVELOPE>
            <HEADER>
                <TALLYREQUEST>Import Data</TALLYREQUEST>
            </HEADER>
            <BODY>
                <IMPORTDATA>
                    <REQUESTDESC>
                        <REPORTNAME>All Masters</REPORTNAME>
                        <STATICVARIABLES>
                            <SVCURRENTCOMPANY>${company}</SVCURRENTCOMPANY>
                        </STATICVARIABLES>
                    </REQUESTDESC>
                    <REQUESTDATA>
                        <TALLYMESSAGE xmlns:UDF="TallyUDF">
                            <LEDGER NAME="${ledgerName}" ACTION="Create">
                                <PARENT>${ledgerGroup}</PARENT>
                                <ADDRESS.LIST TYPE="String">
                                    <ADDRESS></ADDRESS>
                                </ADDRESS.LIST>
                                <MAILINGNAME.LIST TYPE="String">
                                    <MAILINGNAME>${ledgerName}</MAILINGNAME>
                                </MAILINGNAME.LIST>
                                <OLDAUDITENTRYIDS.LIST TYPE="Number">
                                    <OLDAUDITENTRYIDS>-1</OLDAUDITENTRYIDS>
                                </OLDAUDITENTRYIDS.LIST>
                                <GSTAPPLICABLE>&#4; Applicable</GSTAPPLICABLE>
                                <ISBILLWISEON>No</ISBILLWISEON>
                                <ISINTERESTON>No</ISINTERESTON>
                                <ISCOSTCENTRESON>No</ISCOSTCENTRESON>
                                <ISFORJOBWORKIN>No</ISFORJOBWORKIN>
                                <ISFORJOBCOSTING>No</ISFORJOBCOSTING>
                                <ISFORPAYROLL>No</ISFORPAYROLL>
                                <LANGUAGENAME.LIST>
                                    <NAME.LIST TYPE="String">
                                        <NAME>${ledgerName}</NAME>
                                    </NAME.LIST>
                                    <LANGUAGEID>1033</LANGUAGEID>
                                </LANGUAGENAME.LIST>
                            </LEDGER>
                        </TALLYMESSAGE>
                    </REQUESTDATA>
                </IMPORTDATA>
            </BODY>
        </ENVELOPE>`;

        try {
            const response = await axios.post(this.tallyURL, xmlRequest, {
                headers: {
                    "Content-Type": "application/xml",
                },
            });

            console.log("createLedger XML Response:", response.data);

            // Check for exceptions in the XML response
            if (response.data.includes("<LINEERROR>")) {
                throw new Error(`Create ledger failed: ${response.data}`);
            } else {
                console.log("Ledger created successfully.");
            }
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }
}

module.exports = LedgerCreator;