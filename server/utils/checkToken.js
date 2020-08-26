const jwt = require('jsonwebtoken')

const User = require('../models').User

module.exports = async (req, res, next) => {    
    try {
        const header = req.headers['authorization'];

        if (typeof header !== 'undefined') {
            const token = header.split(' ')[1];
            const decoded = await jwt.verify(token, 'secret');
            const user = await User.findByPk(decoded.id);
            console.log(user.id)
            req.id = user.id;
            return next();
        } else {
            return res.status(401).json({
                status: 401,
                msg: 'no headers authorization'
            })
        }
    } catch (err) {
        return res.status(403).json({
            status: 403,
            msg: 'error'
        })
    }
};

