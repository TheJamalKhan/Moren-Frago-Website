import User from "../model/userModel.js";

// @desc    Add an item to the user's cart
// @route   POST /api/cart/add
// @access  Private
export const addToCart = async (req, res) => {
    try {
        const { itemId, size } = req.body;
        const userId = req.userId; // Get user ID from the isAuth middleware

        if (!userId) {
            return res.status(401).json({ message: "Authentication error, user ID not found." });
        }

        const updatePath = `cartData.${itemId}.${size || 'default'}`;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $inc: { [updatePath]: 1 } },
            { new: true, upsert: false } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({ message: "Added to cart", cartData: updatedUser.cartData });

    } catch (error) {
        console.error("addToCart Error:", error);
        return res.status(500).json({ message: "Server error while adding to cart" });
    }
};

// @desc    Remove an item/size from the user's cart
// @route   POST /api/cart/remove
// @access  Private
export const removeFromCart = async (req, res) => {
    try {
        const { itemId, size } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Authentication error, user ID not found." });
        }
        
        const updatePath = `cartData.${itemId}.${size || 'default'}`;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $unset: { [updatePath]: "" } }, 
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({ message: "Item removed from cart", cartData: updatedUser.cartData });

    } catch (error) {
        console.error("removeFromCart Error:", error);
        return res.status(500).json({ message: "Server error while removing from cart" });
    }
};

// @desc    Get the user's current cart
// @route   POST /api/cart/get
// @access  Private
export const getUserCart = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('cartData');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user.cartData || {});

    } catch (error) {
        console.error("getUserCart Error:", error);
        return res.status(500).json({ message: "Server error while fetching cart" });
    }
};


// --- THIS IS THE NEW FUNCTION YOU NEED ---
// @desc    Update the quantity of an item in the cart
// @route   POST /api/cart/update
// @access  Private
export const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Authentication error, user ID not found." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const cartData = user.cartData || {};
        const cartKey = size || 'default';

        // Check if the item and size variant exist in the cart
        if (cartData[itemId] && cartData[itemId][cartKey] !== undefined) {
            if (quantity > 0) {
                // If quantity is positive, update the value
                cartData[itemId][cartKey] = quantity;
            } else {
                // If quantity is 0 or less, remove the size variant
                delete cartData[itemId][cartKey];
                // If the item has no more size variants, remove the item object itself
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }

            // Tell Mongoose that the nested cartData object has been changed
            user.markModified('cartData');
            // Save the updated user document
            await user.save();

            return res.status(200).json({ message: "Cart updated", cartData: user.cartData });
        } else {
            return res.status(404).json({ message: "Item not found in cart." });
        }

    } catch (error) {
        console.error("updateCart Error:", error);
        return res.status(500).json({ message: "Server error while updating cart" });
    }
};
