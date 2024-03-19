"use strict";

var express = require('express');

var router = express.Router();

var ctrlOrder = require('../controllers/order.controller');

var jwtHelper = require('../config/jwtHelper'); // for admin


router.get('/get-orders', jwtHelper.verifyJwtToken, jwtHelper.isAdmin, ctrlOrder.getOrders); // for specific user

router.get('/get-user-orders', jwtHelper.verifyJwtToken, ctrlOrder.getUserOrders);
router.get('/get-order/:id', jwtHelper.verifyJwtToken, ctrlOrder.getOrder);
router.post('/post-order', jwtHelper.verifyJwtToken, ctrlOrder.postOrder);
router.post('/post-order-response', jwtHelper.verifyJwtToken, ctrlOrder.postOrderResponse);
router.put('/update-order-status/:id', jwtHelper.verifyJwtToken, ctrlOrder.updateOrderStatus);
router["delete"]('/delete-order/:id', jwtHelper.verifyJwtToken, ctrlOrder.deleteOrder);
module.exports = router;