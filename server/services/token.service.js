const jwt = require('jsonwebtoken')

class TokenService {
    generate(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1h' })
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET)
        return { accessToken, refreshToken, expiresIn: 3600 }
    }

    validateAccess(accessToken) {
        try {
            return jwt.verify(accessToken, process.env.ACCESS_SECRET)
        } catch (error) {
            return null
        }
    }

    validateRefresh(refreshToken) {
        try {
            return jwt.verify(refreshToken, process.env.REFRESH_SECRET)
        } catch (error) {
            return null
        }
    }
}

module.exports = new TokenService()
