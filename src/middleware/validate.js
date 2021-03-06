const respon = require ('../Helpers/respon')
const jwt = require('jsonwebtoken')
const logger = require('../../utils/logger')
const { error } = require('winston')

const cekToken = (roles) => {
    return function (req, res, next)  {
        const { authtoken } = req.headers
        let isAccess = false;

    if (!authtoken) {
        const result = {
            msg : "Login first"
        }
        logger.warn("Login dulu", result)
        return respon(res, 401, result)
    }

    jwt.verify(authtoken, process.env.JWT_KEYS, (err, decode)=> {
        if(err) {
            logger.warn("Error", err)
            return respon(res, 401, {msg : "Check Token!"})
           
        }
        roles.map((role) => {
            console.log(decode.role)
            if(role == decode.role) {
                isAccess = true
            }
        })
            if(isAccess) {
                next()
            } else {
                return respon(res, 401, {msg: "you not premitted"})
            }
       })
    }
}


module.exports = cekToken