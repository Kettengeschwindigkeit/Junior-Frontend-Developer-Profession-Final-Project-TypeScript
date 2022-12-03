const tokenService = require('../services/token.service')

const checkAuth = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const data = tokenService.validateAccess(token)

        req.userId = data.id

        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

module.exports = checkAuth
