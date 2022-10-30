const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const checkAuth = require('../middleware/checkAuth')

const router = Router()

// Register
// http://localhost:5000/api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body                                                                                                // получаем поля 'email' и 'password', введенные пользователем
        const isUsed = await User.findOne({ email })                                                                                        // делаем проверку на предмет существования переданного 'email'
        
        if (isUsed) {
            return res.json({ message: "This email is already exist!" })                                                                    // если такой 'email' уже занят, сообщаем об этом пользователю 
        }

        const salt = bcrypt.genSaltSync(10)                                                                 
        const hash = bcrypt.hashSync(password, salt)                                                                                        // кодируем пароль
        const newUser = new User({ email, password: hash })                                                                                 // создаем нового пользователя
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })                                            // создаем 'токен' для авторизации пользователя
        
        await newUser.save()                                                                                                                // сохраняем созданного пользователя в базу данных

        res.json({ user: newUser, token, message: "Register success!" })                                                                    // сообщаем пользователю об успешной регистрации
    } catch (error) {
        res.json({ message: "User create error. Try it later..." })                                                                         // сообщаем пользователю об ошибке сервера
        console.log(error)
    }
})

// Login
// http://localhost:5000/api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body                                                                                                // получаем поля 'email' и 'password', введенные пользователем
        const user = await User.findOne({ email })                                                                                          // получаем из базы данных пользователя с указанным 'email'

        if (!user) {
            return res.json({ message: "User not found..." })                                                                               // сообщаем пользователю если указанный 'email' не найден
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)                                                             // сравниваем переданный пароль с паролем из базы данных

        if (!isPasswordCorrect) {
            return res.json({ message: "Wrong password" })                                                                                  // сообщаем пользователю если пароль неверный 
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })                                               // создаем 'токен' для авторизации пользователя

        res.json({ user, token, message: "Welcome!" })                                                                                      // сообщаем об успешной авторизации и возвращаем 'token' и 'user'
    } catch (error) {
        res.json({ message: "Authorization error. Try it later..." })                                                                       // сообщаем пользователю об ошибке сервера
        console.log(error)
    }
})

// // Get Me
// // http://localhost:5000/api/auth/me
// router.get('/me', checkAuth, async (req, res) => {
//     try {
//         const user = await User.findById(req.userId)                                                                                        // получаем пользователя из базы данных по вшитому в запрос id

//         if (!user) {
//             return res.json({ message: "No access!" })                                                                                      // сообщаем пользователю если 'user' не найден
//         }

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })                                               // создаем 'токен' для авторизации пользователя

//         res.json({ user, token })                                                                                                           // возвращаем 'user' и 'token'
        
//     } catch (error) {
//         res.json({ message: "Something went wrong... Try it later" })                                                                       // сообщаем пользователю если на сервере что-то пошло не так
//     }
// })

module.exports = router
