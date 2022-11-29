const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "")

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decoded.id
            next()
        } catch (error) {
            return res.json({ message: "Something went wrong... Try it later" })
        }
    } else {
        return res.json({ message: "No access!" })
    }
}

module.exports = checkAuth
