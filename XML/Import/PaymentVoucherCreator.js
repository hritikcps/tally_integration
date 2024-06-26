const axios = require('axios');

class PaymentVoucherCreator {
    constructor(tallyURL = "http://localhost:9000") {
        this.tallyURL = tallyURL;
    }

    async createPaymentVoucher(date, voucherNumber, partyLedgerName, narration, amount, ledgerName) {
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
                                <VOUCHERNUMBER>${voucherNumber}</VOUCHERNUMBER>
                                <PARTYLEDGERNAME>${partyLedgerName}</PARTYLEDGERNAME>
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
            const response = await axios.post(this.tallyURL, xmlRequest, {
                headers: {
                    "Content-Type": "application/xml",
                },
            });

            console.log("Create Payment Voucher Response:", response.data);
        } catch (error) {
            console.error("Error creating payment voucher:", error);
            throw error;
        }
    }
}

module.exports = PaymentVoucherCreator;