const express = require('express')
const router = express.Router()
const zod = require('zod')
const { authMiddleware } = require('../middleware')
const { Account } = require('../db')
const { default: mongoose } = require('mongoose')

const transferMoneySchmea = zod.object({
    to: zod.string(),
    amount: zod.string(),
})

router.get('/balance', authMiddleware, async (req, res) => {
    const userDetails = await Account.findOne({ userId: req.userID })
    res.status(200).json({
        balance: userDetails.balance
    })
})

router.post('/transfer', authMiddleware, async (req, res) => {
    const { success } = transferMoneySchmea.safeParse(req.body)
    if (!success) {
        return res.status(400).json({ error: 'Invalid request body' })
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;
    const sender = req.userID

    try {
        // fetching sender account
        const senderAccount = await Account.findOne({ userId: sender }).session(session);

        // checking acc balance of sender
        if (!senderAccount && senderAccount.balance < req.body.amount) {
            await session.abortTransaction();
            return res.status(400).json({ error: 'Insufficient balance' })
        }

        // fetching receiver account
        const receiverAccount = await Account.findOne({ userId: to }).session(session);
        if (!receiverAccount) {
            await session.abortTransaction();
            return res.status(400).json({ error: 'Receiver account not found' })
        }

        // perform the transactions
        await Account.updateOne({ userId: sender }, { $inc: { balance: -amount } }).session(session)
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session)

        // commit the Transaction
        await session.commitTransaction();

        res.status(200).json({ message: 'Transfer Successful' })

    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ error: 'Internal Server Error' })
    } finally {
        await session.endSession();
    }

})

module.exports = router