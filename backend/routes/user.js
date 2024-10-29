const express = require('express')
const router = express.Router()
const zod = require('zod')
const { User, Account } = require('../db')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const { authMiddleware } = require('../middleware')

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
})

const userUpdateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.post('/signup', async (req, res) => {
    const { success } = signupSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({ message: 'Email already taken / Incorrect inputs' });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })
    if (existingUser) {
        return res.status(411).json({ message: 'Email already taken / Incorrect inputs' });
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userID = user._id

    // Create User's Bank Account
    await Account.create({
        userId: userID,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userID
    }, JWT_SECRET)

    res.status(200).json({
        message: "User created successfully",
        token: token
    })
})

router.post('/signin', async (req, res) => {
    const { success } = signinSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({ message: 'Error while logging in' })
    }

    const existingUser = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    })

    if (!existingUser) {
        return res.status(411).json({ message: 'Error while logging in' })
    }

    const userID = existingUser._id
    const token = jwt.sign({
        userID
    }, JWT_SECRET)

    return res.status(200).json({
        token: token
    })
})

router.put('/updateUser', authMiddleware, async (req, res) => {

    const {success} = userUpdateSchema.safeParse(req.body)
    if(!success) {
        return res.status(411).json({message: 'Error while updating information'})
    }

    const userID = req.userID
    
    try {
        await User.updateOne({ _id: userID }, req.body);
        return res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
})

router.get('/bulk', async (req, res) => {
    const filter = req.query.filter
    
    const users = await User.find({
        $or : [
            {username: {"$regex":filter}},
            {firstName: {"$regex":filter}},
            {lastName: {"$regex":filter}}
        ]
    })

    res.json({
        users: users.map( user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = router;