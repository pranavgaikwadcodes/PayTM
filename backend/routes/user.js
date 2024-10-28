const express = require('express')
const router = express.Router()
const zod = require('zod')
const { User } = require('../db')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

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

router.post('/signup', async (req, res, next) => {
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

    const token = jwt.sign({
        userID
    }, JWT_SECRET)

    res.status(200).json({
        message: "User created successfully",
        token: token
    })
})

router.post('/signin', async (req, res, next) => {
    const { success } = signinSchema.safeParse(req.body)
    if (!success) {
        res.status(411).json({ message: 'Error while logging in' })
    }

    const existingUser = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    })

    if (!existingUser) {
        res.status(411).json({ message: 'Error while logging in' })
    }

    const userID = existingUser._id
    const token = jwt.sign({
        userID
    }, JWT_SECRET)

    res.status(200).json({
        token: token
    })
})

router.post('/updateUser', (req, res, next) => {

})


module.exports = { router }