require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
const LedgerCreator = require('./LedgerCreator');
const PaymentVoucherCreator = require('./PaymentVoucherCreator');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const ledgerCreator = new LedgerCreator();
const paymentVoucherCreator = new PaymentVoucherCreator();

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.post('/api/ledger', async (req, res) => {
    const { ledgerName, ledgerGroup, company, date, voucherNumber, partyLedgerName, narration, amount } = req.body;

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

        res.status(201).json({ message: 'Ledger and payment voucher created successfully' });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Failed to create ledger or payment voucher' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
