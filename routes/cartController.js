const Cart = require('../models/cart');
// const { verifyToken, verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();

//create
router.use(authController.protect);
// router.use(authController.restrictTo('Customer'));

router.post('/', async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put('/:id', async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete

router.delete('/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json('Cart has been deleted ');
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user Cart
router.get('/find/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
