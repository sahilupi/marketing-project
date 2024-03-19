const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const User = mongoose.model('User');
const nodemailer = require('nodemailer');

const devenv = require('../devenv');

const stripe = require('stripe')(process.env.STRIPE_SECRET || devenv.STRIPE_SECRET);

const sendOrderMail = (currentUser, order) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAILER_AUTH_HOST || devenv.MAILER_AUTH_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAILER_AUTH_EMAIL || devenv.MAILER_AUTH_EMAIL,
            pass: process.env.MAILER_AUTH_PASS || devenv.MAILER_AUTH_PASS
        }
    });

    const mailOptions = {
        from: process.env.MAILER_AUTH_EMAIL || devenv.MAILER_AUTH_EMAIL,
        to: process.env.MAIL_RECIEVER || devenv.MAIL_RECIEVER,
        subject: 'Order for from Markutting',
        html: `<h2>${currentUser.fullName.toUpperCase()} ordered plan on markutting</h2> 
        <h3> Name:  <strong><i>${currentUser.fullName}</i></strong></h3>
        <h3> Email:  <strong><i>${currentUser.email}</i></strong></h3>
        <h3><strong>Order Details</strong></h3>
        <h3> Payment Status:  <strong>${order.orderDetails.paymentStatus}</strong></h3>
        <h3> Youtube Link:  <strong><a href=${order.orderDetails.youtubeLink} target="_blank">Youtube Link<a></strong></h3>
        <h3> Gender:  <strong>${order.orderDetails.gender}</strong></h3>
        <h3> Age:  <strong>${order.orderDetails.age}</strong></h3>
        <h3> Location:  <strong>${order.orderDetails.location}</strong></h3>
        <h3> Country:  <strong>${order.orderDetails.country}</strong></h3>
        <h3> Video Category:  <strong>${order.orderDetails.videoCategory ? order.orderDetails.videoCategory : ''}</strong></h3>
        <h3> Keywords:  <strong>${order.orderDetails.keywords ? order.orderDetails.keywords : ''}</strong></h3>
        <h3> Budget:  <strong>${order.orderDetails.budget}</strong></h3>
        <h3> Currency:  <strong>${order.orderDetails.currency}</strong></h3>
        <h3> Views:  <strong>${order.orderDetails.views}</strong></h3>
        <div style="background-color:#3f51b5; color:white;padding:24px 2px; max-width: 50%; text-align:center">
        <a style="color:white; text-decoration:none;" href="https://www.markutting.com/admin/orders">VIEW ORDERS</a></div>
        `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
            //   res.send({error: error})
        } else {
            res.send({res: info.response, message: 'Details sent successfully'})
        }
    });
}

module.exports.getOrders = (req, res, next) => {
    try {
        Order.find().populate('user', 'fullName email').sort({
            'createdAt': -1
        }).then(orders => {
            if (!orders || orders.length < 1) {
                return res.status(404).json({
                    success: false,
                    message: 'No orders found.'
                });
            } else {
                return res.status(200).json({
                    success: true,
                    orders: orders
                });
            }
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
};

module.exports.getUserOrders = (req, res, next) => {
    try {
        Order.find({
            user: req._id
        }).sort({
            'createdAt': -1
        }).then(userOrders => {
            if (!userOrders || userOrders.length < 1) {
                return res.status(404).json({
                    success: false,
                    message: 'No orders found.'
                });
            } else {
                return res.status(200).json({
                    success: true,
                    orders: userOrders
                });
            }
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
};

module.exports.getOrder = (req, res, next) => {
    try {
        Order.findById(req.params.id)
            .populate('user', 'fullName email')
            .then(order => {
                if (!order || order.length < 1) {
                    return res.status(404).json({
                        success: false,
                        message: 'No order found.'
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        order: order
                    });
                }
            }).catch(err => {
                return next(err);
            })
    } catch (err) {
        return next(err);
    }
};

module.exports.postOrder = async (req, res, next) => {
    try {
        const lineItems = [{
            price_data: {
                currency: 'INR',
                product_data: {
                    name: req.body.orderBody.youtubeLink,
                },
                unit_amount: +req.body.orderBody.budget * 100
            },
            quantity: 1
        }]

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: req.body.domain + '/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: req.body.domain + '/advertiser/allvideocheckout',
        });
        const order = new Order({
            orderDetails: {
                paymentStatus: 'Pending',
                payableTotal: req.body.orderBody.budget,
                planPrice: req.body.orderBody.budget,
                youtubeLink: req.body.orderBody.youtubeLink,
                targetAndWants: req.body.orderBody.targetAndWants,
                location: req.body.orderBody.location,
                gender: req.body.orderBody.gender,
                age: req.body.orderBody.age,
                country: req.body.orderBody.country,
                videoCategory: req.body.orderBody.videoCategory,
                keywords: req.body.orderBody.keywords,
                budget: req.body.orderBody.budget,
                views: req.body.orderBody.views
            },
            orderSessionId: session.id,
            user: req._id
        });

        order.save().then(async (savedOrder) => {
            if (!savedOrder) {
                return res.status(503).send({
                    success: false,
                    message: 'Order can not be placed! Please try again.'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Creating order',
                sessionId: session.id
            });
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
};

module.exports.postOrderResponse = async (req, res, next) => {
    try {
        const user = await User.findById(req._id);
        const order = await Order.findOne({
            orderSessionId: req.body.orderSessionId
        });
        if (!order || !user) {
            return res.status(404).json({
                success: false,
                message: 'Order id or User not found'
            })
        }
        order.orderDetails.paymentStatus = "Success";
        order.save().then((savedOrder) => {
            if (!savedOrder) {
                return res.status(503).send({
                    success: false,
                    message: 'Order can not be placed! Please try again.'
                });
            }
            sendOrderMail(user, savedOrder);
            return res.status(201).send({
                success: true,
                message: 'Order placed succussfully!',
                order: savedOrder
            });
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
}

module.exports.updateOrderStatus = (req, res, next) => {
    try {
        Order.findByIdAndUpdate(req.params.id).then((founededOrder) => {
            if (!founededOrder) {
                return res.status(404).send({
                    success: false,
                    message: 'Category not found!'
                });
            } else {
                founededOrder.status = req.body.status;
            };

            founededOrder.save().then((savedOrder) => {
                if (!savedOrder) {
                    return res.status(503).send({
                        success: false,
                        message: 'Order status can not be updated! Please try again.'
                    });
                }
                return res.status(201).send({
                    success: true,
                    message: 'Order status updated!',
                    order: savedOrder
                });
            }).catch(err => {
                return next(err);
            })
        }).catch(err => {
            return next(err);
        })
    } catch (err) {
        return next(err);
    }
};

module.exports.deleteOrder = (req, res, next) => {
    try {
        Order.findByIdAndRemove(req.params.id).then(async order => {
            if (!order) {
                return res.status(404).send({
                    success: false,
                    message: 'Order not found!'
                });
            };
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndRemove(orderItem);
            });
            return res.status(201).send({
                success: true,
                message: 'Order deleted succussfully!'
            });
        }).catch(err => {
            return next(err);
        });
    } catch (err) {
        return next(err);
    };
};