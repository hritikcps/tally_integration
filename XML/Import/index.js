const LedgerCreator = require('./LedgerCreator');
const PaymentVoucherCreator = require('./PaymentVoucherCreator');

async function main() {
    const ledgerCreator = new LedgerCreator();
    const paymentVoucherCreator = new PaymentVoucherCreator();

    const date = "20240501";
    const bankName = "IDFC Bank";
    const voucherNumber = "PV004";
    const partyLedgerName = "Bank Accounts";
    const narration = "Payment for qwerty from IDFC Bank";
    const amount = 3000.0;
    const ledgerName = "qwerty";
    const ledgerGroup = "Fixed Assets";
    const company = "Cp";

    try {
        // Create ledger
        await ledgerCreator.createLedger(ledgerName, ledgerGroup, company);

        // Create payment voucher
        await paymentVoucherCreator.createPaymentVoucher(
            date,
            voucherNumber,
            partyLedgerName,
            narration,
            amount,
            ledgerName
        );

        console.log("Operations completed successfully.");
    } catch (error) {
        console.error("Error in main execution:", error);
    }
}

main();