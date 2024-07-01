// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js"
// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// // Placing User Order for Frontend
// const placeOrder = async (req, res) => {

//     try {
//         const newOrder = new orderModel({
//             userId: req.body.userId,
//             items: req.body.items,
//             amount: req.body.amount,
//             address: req.body.address,
//         })
//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//         const line_items = req.body.items.map((item) => ({
//             price_data: {
//               currency: "inr",
//               product_data: {
//                 name: item.name
//               },
//               unit_amount: item.price*100*80
//             },
//             quantity: item.quantity
//           }))

//         line_items.push({
//             price_data:{
//                 currency:"inr",
//                 product_data:{
//                     name:"Delivery Charge"
//                 },
//                 unit_amount: 5*80*100
//             },
//             quantity:1
//         })
        
//           const session = await stripe.checkout.sessions.create({
//             success_url: `http://localhost:5173/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url: `http://localhost:5173/verify?success=false&orderId=${newOrder._id}`,
//             line_items: line_items,
//             mode: 'payment',
//           });
      
//           res.json({success:true,session_url:session.url});

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" })
//     }
// }

// // Listing Order for Admin panel
// const listOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({});
//         res.json({ success: true, data: orders })
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" })
//     }
// }

// // User Orders for Frontend
// const userOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({ userId: req.body.userId });
//         res.json({ success: true, data: orders })
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" })
//     }
// }

// const updateStatus = async (req, res) => {
//     console.log(req.body);
//     try {
//         await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
//         res.json({ success: true, message: "Status Updated" })
//     } catch (error) {
//         res.json({ success: false, message: "Error" })
//     }

// }

// const verifyOrder = async (req, res) => {
//     const {orderId , success} = req.body;
//     try {
//         if (success==="true") {
//             await orderModel.findByIdAndUpdate(orderId, { payment: true });
//             res.json({ success: true, message: "Paid" })
//         }
//         else{
//             await orderModel.findByIdAndDelete(orderId)
//             res.json({ success: false, message: "Not Paid" })
//         }
//     } catch (error) {
//         res.json({ success: false, message: "Not  Verified" })
//     }

// }

// export { placeOrder, listOrders, userOrders, updateStatus ,verifyOrder }

// orderController.js

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Function to handle cash on delivery orders
const handleCashOnDelivery = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            paymentMethod: 'Cash on Delivery' // Indicate payment method
        });

        // Save the new order
        await newOrder.save();

        // Update user's cart data
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Respond with success message
        res.status(201).json({ success: true, message: "Order placed successfully." });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ success: false, message: "Error placing order." });
    }
};

// Function to place user order for frontend
const placeOrder = async (req, res) => {
    // Existing implementation...
};

// Function to list orders for admin panel
const listOrders = async (req, res) => {
    // Existing implementation...
};

// Function to retrieve user orders for frontend
const userOrders = async (req, res) => {
    // Existing implementation...
};

// Function to update order status
const updateStatus = async (req, res) => {
    // Existing implementation...
};

// Function to verify order payment
const verifyOrder = async (req, res) => {
    // Existing implementation...
};

// Export all functions
export { placeOrder, listOrders, userOrders, updateStatus, verifyOrder, handleCashOnDelivery };


// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js"

// // Placing User Order for Frontend
// const placeOrder = async (req, res) => {
//     try {
//         const newOrder = new orderModel({
//             userId: req.body.userId,
//             items: req.body.items,
//             amount: req.body.amount,
//             address: req.body.address,
//             paymentMethod: req.body.paymentMethod // Add payment method to order
//         });

//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//         // If payment method is cashOnDelivery, no need to process payment through Stripe
//         if (req.body.paymentMethod === "cashOnDelivery") {
//             return res.json({ success: true, message: "Order placed successfully. Payment will be collected on delivery." });
//         }

//         // If payment method is not cashOnDelivery, process payment through Stripe
//         // ... Stripe payment code (uncomment and modify this part if needed) ...

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" });
//     }
// }

// // User Orders for Frontend
// const userOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({ userId: req.body.userId });
//         res.json({ success: true, data: orders });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" });
//     }
// }

// export { placeOrder, userOrders };