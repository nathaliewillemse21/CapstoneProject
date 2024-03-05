import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
const { sign, verify } = jwt;

function createToken(user) {
    return sign({
        emailAdd: user.emailAdd,
        userPwd: user.Pass,
    },
        process.env.SECRET_KEY,
        {
            expiresIn:'1h',
        }
    )
}
function verifyToken(req, res, next) {
    const token = req?.header['Authorization']
    if (token) {
        if (verify(token, process.env.SECRET_KEY)) {
            next()
        } else {
            res?.json({
                status: res.statusCode,
                msg: 'Pleaase provide your correct details',
            })
        }
    } else {
        res.json({
            status: res.statusCode,
            msg: 'Please login',
        })
    }
}
export { createToken, verifyToken };

