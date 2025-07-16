const Cart = require('../models/Cart');

module.exports = {
    addProductToCart: async (req, res) => {
        const userId = req.user.id;
        const { productId, totalPrice, quantity, additives } = req.body;

        try {
            const existingProduct = await Cart.findOne({ userId, productId });

            if (existingProduct) {
                // Assuming totalPrice is unit price
                const unitPrice = totalPrice;

                existingProduct.quantity += quantity;
                existingProduct.totalPrice += unitPrice * quantity;

                await existingProduct.save();
            } else {
                const newCartItem = new Cart({
                    userId,
                    productId,
                    totalPrice: totalPrice * quantity, // Save total price
                    quantity,
                    additives,
                });

                await newCartItem.save();
            }

            const count = await Cart.countDocuments({ userId });

            return res.status(200).json({ status: true, count });
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message });
        }
    },


    removeCartItems: async (req, res) => {
        const cartItemId = req.params.id;
        const userId = req.user.id;

        try {
            await Cart.findByIdAndDelete({ _id: cartItemId });
            const count = await Cart.countDocuments({ userId: userId });

            res.status(200).json({ status: true, count: count });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getCart: async (req, res) => {
        const userId = req.user.id;

        try {
            const cart = await Cart.find({ userId: userId })
                .populate({
                    path: 'productId',
                    select: 'imageUrl title restaurant ratingCount',
                    populate: {
                        path: 'restaurant',
                        select: 'time coords',
                    }
                });
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getCartCount: async (req, res) => {
        const userId = req.user.id;

        try {
            const count = await Cart.countDocuments({ userId: userId });
            res.status(200).json({ status: true, count: count })
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    decrementProductQty: async (req, res) => {
        const id = req.params.id;

        try {
            const cartItem = await Cart.findById(id);

            if (!cartItem) {
                return res.status(400).json({ status: false, message: "Cart item not found" });
            }

            const productPrice = cartItem.totalPrice / cartItem.quantity;

            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
                cartItem.totalPrice -= productPrice;
                await cartItem.save();

                return res.status(200).json({ status: true, message: "Product quantity successfully decremented" });
            } else {
                await Cart.findByIdAndDelete(id);
                return res.status(200).json({ status: true, message: "Product successfully removed from cart" });
            }

        } catch (error) {
            return res.status(500).json({ status: false, message: error.message });
        }
    }

}