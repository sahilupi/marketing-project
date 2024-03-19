const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const User = mongoose.model('User');
const devenv = require('../devenv');

module.exports.verifyJwtToken = (req, res, next) => {
    let token;
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];
    if (!token)
        return res.status(403).send({
            auth: false,
            message: 'No token provided.'
        });
    else {
        jwt.verify(token, process.env.JWT_SECRET || devenv.LOCAL_JWT_SECRET,
            (err, decoded) => {
                if (err)
                    return res.status(500).send({
                        auth: false,
                        message: 'Token authentication failed.'
                    });
                else {
                    req._id = decoded._id;
                    req._email = decoded._email;
                    next();
                }
            }
        )
    }
}

module.exports.isAdmin = (req, res, next) => {
    User.findOne({ _id: req._id }, (err, user) => {
            if (err) {
                return res.status(500).send({
                    auth: false,
                    message: err
                });
            }
            // unknown user
            else if (!user){
                return res.status(404).send({
                    auth: false,
                    message: 'Not Authorized'
                });
           }
            // authentication succeeded
            else if ( user['role'] !== 'admin'){
                return res.status(401).send({
                    message: 'Not Authenticated.'
                });
            }
            else{
                next();
            }
        }).lean();
}