const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = Router()

// Register
// http://localhost:5001/api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body
        const isUsed = await User.findOne({ email })

        if (isUsed) {
            return res.json({ message: "This email is already exist!" })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = new User({ email, password: hash })
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        await newUser.save()

        res.json({ user: newUser, token, message: "Register success!" })
    } catch (error) {
        res.json({ errorMessage: "User create error. Try it later..." })
    }
})

// Login
// http://localhost:5001/api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.json({ message: "User not found..." })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({ message: "Wrong password" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.json({ user, token, message: "Welcome!" })
    } catch (error) {
        res.json({ errorMessage: "Authorization error. Try it later..." })
    }
})

module.exports = router
