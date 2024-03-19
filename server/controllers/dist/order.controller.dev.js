"use strict";

var mongoose = require('mongoose');

var Order = mongoose.model('Order');
var User = mongoose.model('User');

var nodemailer = require('nodemailer');

var devenv = require('../devenv');

var stripe = require('stripe')(process.env.STRIPE_SECRET || devenv.STRIPE_SECRET);

var sendOrderMail = function sendOrderMail(currentUser, order) {
  var transporter = nodemailer.createTransport({
    host: process.env.MAILER_AUTH_HOST || devenv.MAILER_AUTH_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILER_AUTH_EMAIL || devenv.MAILER_AUTH_EMAIL,
      pass: process.env.MAILER_AUTH_PASS || devenv.MAILER_AUTH_PASS
    }
  });
  var mailOptions = {
    from: process.env.MAILER_AUTH_EMAIL || devenv.MAILER_AUTH_EMAIL,
    to: process.env.MAIL_RECIEVER || devenv.MAIL_RECIEVER,
    subject: 'Order for from Markutting',
    html: "<h2>".concat(currentUser.fullName.toUpperCase(), " ordered plan on markutting</h2> \n        <h3> Name:  <strong><i>").concat(currentUser.fullName, "</i></strong></h3>\n        <h3> Email:  <strong><i>").concat(currentUser.email, "</i></strong></h3>\n        <h3><strong>Order Details</strong></h3>\n        <h3> Payment Status:  <strong>").concat(order.orderDetails.paymentStatus, "</strong></h3>\n        <h3> Youtube Link:  <strong><a href=").concat(order.orderDetails.youtubeLink, " target=\"_blank\">Youtube Link<a></strong></h3>\n        <h3> Gender:  <strong>").concat(order.orderDetails.gender, "</strong></h3>\n        <h3> Age:  <strong>").concat(order.orderDetails.age, "</strong></h3>\n        <h3> Location:  <strong>").concat(order.orderDetails.location, "</strong></h3>\n        <h3> Country:  <strong>").concat(order.orderDetails.country, "</strong></h3>\n        <h3> Video Category:  <strong>").concat(order.orderDetails.videoCategory ? order.orderDetails.videoCategory : '', "</strong></h3>\n        <h3> Keywords:  <strong>").concat(order.orderDetails.keywords ? order.orderDetails.keywords : '', "</strong></h3>\n        <h3> Budget:  <strong>").concat(order.orderDetails.budget, "</strong></h3>\n        <h3> Currency:  <strong>").concat(order.orderDetails.currency, "</strong></h3>\n        <h3> Views:  <strong>").concat(order.orderDetails.views, "</strong></h3>\n        <div style=\"background-color:#3f51b5; color:white;padding:24px 2px; max-width: 50%; text-align:center\">\n        <a style=\"color:white; text-decoration:none;\" href=\"https://www.markutting.com/admin/orders\">VIEW ORDERS</a></div>\n        ")
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error); //   res.send({error: error})
    } else {
      res.send({
        res: info.response,
        message: 'Details sent successfully'
      });
    }
  });
};

module.exports.getOrders = function (req, res, next) {
  try {
    Order.find().populate('user', 'fullName email').sort({
      'createdAt': -1
    }).then(function (orders) {
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
    })["catch"](function (err) {
      return next(err);
    });
  } catch (err) {
    return next(err);
  }
};

module.exports.getUserOrders = function (req, res, next) {
  try {
    Order.find({
      user: req._id
    }).sort({
      'createdAt': -1
    }).then(function (userOrders) {
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
    })["catch"](function (err) {
      return next(err);
    });
  } catch (err) {
    return next(err);
  }
};

module.exports.getOrder = function (req, res, next) {
  try {
    Order.findById(req.params.id).populate('user', 'fullName email').then(function (order) {
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
    })["catch"](function (err) {
      return next(err);
    });
  } catch (err) {
    return next(err);
  }
};

module.exports.postOrder = function _callee2(req, res, next) {
  var lineItems, session, order;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          lineItems = [{
            price_data: {
              currency: 'INR',
              product_data: {
                name: req.body.orderBody.youtubeLink
              },
              unit_amount: +req.body.orderBody.budget * 100
            },
            quantity: 1
          }];
          _context2.next = 4;
          return regeneratorRuntime.awrap(stripe.checkout.sessions.create({
            line_items: lineItems,
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: req.body.domain + '/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: req.body.domain + '/advertiser/allvideocheckout'
          }));

        case 4:
          session = _context2.sent;
          order = new Order({
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
          order.save().then(function _callee(savedOrder) {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (savedOrder) {
                      _context.next = 2;
                      break;
                    }

                    return _context.abrupt("return", res.status(503).send({
                      success: false,
                      message: 'Order can not be placed! Please try again.'
                    }));

                  case 2:
                    return _context.abrupt("return", res.status(200).json({
                      success: true,
                      message: 'Creating order',
                      sessionId: session.id
                    }));

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            });
          })["catch"](function (err) {
            return next(err);
          });
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", next(_context2.t0));

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports.postOrderResponse = function _callee3(req, res, next) {
  var user, order;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findById(req._id));

        case 3:
          user = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(Order.findOne({
            orderSessionId: req.body.orderSessionId
          }));

        case 6:
          order = _context3.sent;

          if (!(!order || !user)) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            success: false,
            message: 'Order id or User not found'
          }));

        case 9:
          order.orderDetails.paymentStatus = "Success";
          order.save().then(function (savedOrder) {
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
          })["catch"](function (err) {
            return next(err);
          });
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", next(_context3.t0));

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

module.exports.updateOrderStatus = function (req, res, next) {
  try {
    Order.findByIdAndUpdate(req.params.id).then(function (founededOrder) {
      if (!founededOrder) {
        return res.status(404).send({
          success: false,
          message: 'Category not found!'
        });
      } else {
        founededOrder.status = req.body.status;
      }

      ;
      founededOrder.save().then(function (savedOrder) {
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
      })["catch"](function (err) {
        return next(err);
      });
    })["catch"](function (err) {
      return next(err);
    });
  } catch (err) {
    return next(err);
  }
};

module.exports.deleteOrder = function (req, res, next) {
  try {
    Order.findByIdAndRemove(req.params.id).then(function _callee5(order) {
      return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (order) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return", res.status(404).send({
                success: false,
                message: 'Order not found!'
              }));

            case 2:
              ;
              _context5.next = 5;
              return regeneratorRuntime.awrap(order.orderItems.map(function _callee4(orderItem) {
                return regeneratorRuntime.async(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return regeneratorRuntime.awrap(OrderItem.findByIdAndRemove(orderItem));

                      case 2:
                      case "end":
                        return _context4.stop();
                    }
                  }
                });
              }));

            case 5:
              return _context5.abrupt("return", res.status(201).send({
                success: true,
                message: 'Order deleted succussfully!'
              }));

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      });
    })["catch"](function (err) {
      return next(err);
    });
  } catch (err) {
    return next(err);
  }

  ;
};