const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/order");
const auth = require('../middleware/authMiddleware');

router.post('/', auth.adminOnly, orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.put("/:id", orderController.updateOrderStatus);

module.exports = router;
