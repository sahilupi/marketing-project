const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const User = mongoose.model('User');

const devenv = require('../devenv');

const sendResetPasswordMail = (req, user) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: process.env.MAILER_AUTH_EMAIL || devenv.LOCAL_MAILER_AUTH_EMAIL,
            pass: process.env.MAILER_AUTH_PASS || devenv.LOCAL_MAILER_AUTH_PASS
        }
    });
    const mailOptions = {
        to: user.email,
        from: process.env.MAILER_AUTH_EMAIL || devenv.LOCAL_MAILER_AUTH_EMAIL,
        subject: 'Password Reset from ' + req.body.domain,
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            req.body.domain + '/user/response-reset-password/' + user.resettoken + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
            //   res.send({error: error})
        } else {
            console.log('Email sent')
            // res.send({res: info.response, message: 'Details sent successfully'})
        }
    })
}

const userExists = async (email) => {
    const user = await User.findOne({
        email: email.toLowerCase().trim()
    })
    if (user) {
        return true;
    } else {
        return false;
    }
}

module.exports.postRegisterUser = async (req, res, next) => {
    try {
        let user = new User();
        user.fullName = req.body.fullName;
        user.email = req.body.email;
        user.password = User.hashPassword(req.body.password);

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(422).send({
                success: false,
                message: 'Passwords do not match'
            });
        }

        if (await userExists(req.body.email)) {
            return res.status(409).json({
                success: false,
                message: 'Account with this email address exists already! Please try with different one'
            })
        }
        user.save().then(() => {
            return res.status(200).send({
                success: true,
                message: 'User added succussfully!'
            });
        }).catch(err => {
            if (err.code == 11000)
                return res.status(409).send({
                    success: false,
                    message: 'Account with this email address exists already!'
                });
            else
                return next(err);
        })

    } catch (err) {
        return next(err);
    }
}

module.exports.authenticate = (req, res, next) => {
    try {
        User.findOne({
            email: req.body.email
        }).then((user) => {
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: 'No account found with this email address!'
                });
            } else if (!user.verifyPassword(req.body.password)) {
                return res.status(401).send({
                    success: false,
                    message: 'Incorrect password'
                });
            }
            return res.status(200).send({
                success: true,
                message: 'User fetched succussfully!',
                _id: user['_id'],
                name: user['name'],
                token: user.generateJwt(req.body.remeberMe)
            });
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
}

module.exports.authenticateAdmin = (req, res, next) => {
    try {
        User.findOne({
            email: req.body.email
        }).then((user) => {
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: 'No account found with this email address!'
                });
            } else if (!user.verifyPassword(req.body.password)) {
                return res.status(401).send({
                    success: false,
                    message: 'Incorrect password'
                });
            } else if (user['role'].toLowerCase() !== 'admin') {
                return res.status(401).send({
                    success: false,
                    message: 'Not Authorized!'
                });
            }
            return res.status(200).send({
                success: true,
                message: 'User fetched succussfully!',
                _id: user['_id'],
                name: user['name'],
                token: user.generateJwt(req.body.remeberMe)
            });
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
}

module.exports.getUserProfile = (req, res, next) => {
    try {
        User.findById(req._id).select('-password -role').then(user => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User record not found.'
                });
            } else {
                return res.status(200).json({
                    success: true,
                    user: user
                });
            }
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
}

module.exports.patchUpdateUserProfile = (req, res, next) => {
    try {
        User.findByIdAndUpdate(req._id).select('-password -role').then((founededUser) => {
            if (!founededUser) {
                return res.status(404).send({
                    success: false,
                    message: 'No account found with this email address!'
                });
            } else {
                if (req.body.fullName) {
                    founededUser.name = req.body.name;
                }
                if (req.body.email) {
                    founededUser.email = req.body.email;
                }
                if (req.body.phone) {
                    founededUser.phone = req.body.phone;
                }
            };

            founededUser.save().then((savedUser) => {
                if (!savedUser) {
                    return res.status(503).send({
                        success: false,
                        message: 'Details can not be updated! Please try again.'
                    });
                }
                return res.status(201).send({
                    success: true,
                    message: 'Profile updated succussfully!',
                    user: savedUser
                });
            }).catch(err => {
                return next(err);
            });
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
}

module.exports.putChangePassword = (req, res, next) => {
    try {
        User.findOne({
            _id: req._id
        }, (err, user) => {
            // Check if error connecting
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err
                }); // Return error
            } else {
                // Check if user was found in database
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: 'User not found'
                    }); // Return error, user was not found in db
                } else {
                    if (!user.verifyPassword(req.body.oldPassword)) {
                        return res.status(401).json({
                            success: false,
                            message: 'Old password is incorrect'
                        });
                    }
                    if (req.body.newPassword !== req.body.confirmNewPassword) {
                        return res.status(401).json({
                            success: false,
                            message: 'Paswords do no match'
                        });
                    }
                    // user.password = req.body.newPassword;
                    user.password = User.hashPassword(req.body.newPassword)
                    user.save((err, doc) => {
                        if (!err)
                            return res.status(200).send({
                                success: true,
                                message: 'Password Changed succussfully'
                            });
                        else {
                            return next(err);
                        }

                    });
                }
            }
        });
    } catch (err) {
        return next(err);
    }

}

module.exports.resetPassword = async (req, res) => {
    if (!req.body.email) {
        return res.status(500).json({
            message: 'Email is required.'
        });
    }
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) {
        return res.status(409).json({
            message: 'Account with this email address does not exist on this website.'
        });
    }

    user.resettoken = crypto.randomBytes(16).toString('hex')
    user.save(function (err) {
        if (err) {
            return res.status(500).send({
                msg: err.message
            });
        }

        User.find({
            _id: user._id,
            resettoken: {
                $ne: user.resettoken
            }
        }).remove().exec();
        res.status(200).json({
            message: 'Reset Password successfully.'
        });
        sendResetPasswordMail(req, user);
    })
}

module.exports.validatePasswordToken = async (req, res) => {
    if (!req.body.resettoken) {
        return res
            .status(500)
            .json({
                message: 'Token is required'
            });
    }
    const user = await User.findOne({
        resettoken: req.body.resettoken
    });
    if (!user) {
        return res
            .status(409)
            .json({
                message: 'Invalid URL'
            });
    }
    User.findOne({
        _id: user._id
    }).then(() => {
        res.status(200).json({
            message: 'Token verified successfully.'
        });
    }).catch((err) => {
        console.log(err)
        return res.status(500).send({
            msg: err.message
        });
    });
}

module.exports.newPassword = async (req, res) => {
    User.findOne({
        resettoken: req.body.resettoken
    }, function (err, user, next) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res
                .status(409)
                .json({
                    message: 'User does not exist'
                });
        } else if (!user.resettoken) {
            return res
                .status(409)
                .json({
                    message: 'Token has expired'
                });
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.status(401).json({
                success: false,
                message: 'Paswords do no match'
            });
        }

        user.password = User.hashPassword(req.body.newPassword);
        user.resettoken = null;
        user.save(function (err) {
            if (err) {
                return res
                    .status(400)
                    .json({
                        message: 'Password can not reset.'
                    });
            } else {
                user.resettoken = null;
                return res
                    .status(201)
                    .json({
                        message: 'Password reset successfully'
                    });
            }
        });
    })
}

module.exports.postContactForm = async (req, res, next) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAILER_AUTH_EMAIL || localENV.LOCAL_MAILER_AUTH_EMAIL,
                pass: process.env.MAILER_AUTH_PASS || localENV.LOCAL_MAILER_AUTH_PASS
            }
        });
        const mailOptions = {
            from: process.env.MAILER_AUTH_EMAIL,
            to: process.env.ADMIN_EMAIL || localENV.LOCAL_ADMIN_EMAIL,
            subject: req.body.subject + ' (Someone submitted contact form on ' + req.body.domain + ')',
            html: `<h2>Someone submitted contact form on ${req.body.domain}</h2> 
            <h3> Name:  <strong><i>${req.body.fullName}</i></strong></h3>
            <h3> Email:  <strong><i>${req.body.email}</i></strong></h3>
            <h3> Contact No:  <strong><i>${req.body.phone}</i></strong></h3>
            <h3> Message.:  <strong><i>${req.body.message}</i></strong></h3>
            `,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return next(err);
                //   res.send({error: error})
            } else {
                return res.send({
                    res: info.response,
                    message: 'Form submitted successfully!'
                });
            }
        });
    } catch (err) {
        return next(err);
    }
}