const LedgerCreator = require('./LedgerCreator');
const PaymentVoucherCreator = require('./PaymentVoucherCreator');

async function main() {
    const ledgerCreator = new LedgerCreator();
    const paymentVoucherCreator = new PaymentVoucherCreator();

    const date = "20240401";
    const bankName = "IDFC Bank";
    const narration = "Payment for watch from IDFC Bank";
    const amount = 40000.0;
    const ledgerName = "Bank";
    const ledgerGroup = "Fixed Assets";
    const company = "Cp";

    try {
        // Create ledger
        await ledgerCreator.createLedger(ledgerName, ledgerGroup, company);

        // Create payment voucher
        await paymentVoucherCreator.createPaymentVoucher(
            date,
            "PV006",
            "Bank Accounts",
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