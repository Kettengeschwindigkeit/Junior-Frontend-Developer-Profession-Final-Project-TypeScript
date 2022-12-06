const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const checkAuth = require('../middleware/checkAuth')
const tokenService = require('../services/token.service')
const User = require('../models/User')

const router = Router()

// Register
// http://localhost:5001/api/auth/register
router.post('/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password must contain at least 8 characters').isLength({ min: 8 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.json({ error: errors.array(), message: errors.errors[0].msg })
            }

            const { email, password } = req.body
            const isUsed = await User.findOne({ email })

            if (isUsed) {
                return res.json({ message: "This email is already exist!" })
            }

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            const newUser = new User({ email, password: hash })

            await newUser.save()

            const tokens = tokenService.generate({ id: newUser._id })

            res.status(201).json({ user: newUser, ...tokens, message: "Register success!" })
        } catch (error) {
            res.status(500).json({ errorMessage: "User create error. Try it later..." })
        }
    })

// Login
// http://localhost:5001/api/auth/login
router.post('/login',
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
        check('password', 'Please enter the password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.json({ error: errors.array(), message: errors.errors[0].msg })
            }

            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: "User not found..." })
            }

            const isPasswordCorrect = await bcrypt.compare(password, user.password)

            if (!isPasswordCorrect) {
                return res.json({ message: "Wrong password" })
            }

            const tokens = tokenService.generate({ id: user._id })

            res.status(200).json({ user, ...tokens, message: "Welcome!" })
        } catch (error) {
            res.status(500).json({ errorMessage: "Authorization error. Try it later..." })
        }
    })

// Refresh Token
// http://localhost:5001/api/auth/token
router.post('/token', checkAuth, async (req, res) => {
    try {
        const { refreshToken } = req.body
        const user = await User.findById(req.userId)
        const data = tokenService.validateRefresh(refreshToken)

        if (!data || data.id !== user?._id.toString()) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const tokens = tokenService.generate({ id: user._id })

        res.status(200).json({ user, ...tokens })
    } catch (error) {
        res.status(500).json({ message: 'Server error...' })
    }
})

module.exports = router
