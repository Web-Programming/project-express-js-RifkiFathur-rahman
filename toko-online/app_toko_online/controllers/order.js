const Order = require("../models/orders");

const createOrder = async (req, res) => {
  try {
    const { user, orderItems } = req.body;

    if (!user || !orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "Data pesanan tidak lengkap" });
    }

    // Hitung totalAmount dari semua item
    const totalAmount = orderItems.reduce((sum, item) => {
      return sum + item.priceAtOrder * item.quantity;
    }, 0);

    const order = await Order.create({
      user,
      orderItems,
      totalAmount,
    });

    res.status(201).json({
      message: "Pesanan berhasil dibuat",
      data: order,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ orderDate: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("orderItems.product", "name price");

    if (!order)
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });

    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status pesanan harus diisi" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order)
      return res.status(404).json({ message: "Pesanan tidak ditemukan" });

    res.status(200).json({
      message: "Status pesanan berhasil diperbarui",
      data: order,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Export semua fungsi dalam satu objek
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};
