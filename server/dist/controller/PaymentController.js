import Razorpay from "razorpay";
import crypto from "crypto";
import { HttpCode } from "../helper/HttpCode.js";
import { PaymentModel } from "../model/PaymentModel.js";
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
class PaymentController {
    async createPaymentOrder(req, res) {
        try {
            const { amount, currency = "INR" } = req.body;
            const order = await razorpay.orders.create({
                amount: amount * 100,
                currency,
                receipt: "qwsaq1",
            });
            const razorpayOptions = {
                key: process.env.RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Spice Junction",
                description: "Order payment",
                order_id: order.id,
                prefill: {
                    name: "Franklyn Gomes",
                    email: "franklyngomes15@gmail.com",
                    contact: "9878767656",
                },
                theme: {
                    color: "#F90912",
                },
            };
            return res.status(200).json({
                success: true,
                razorpayOptions,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Order creation failed",
            });
        }
    }
    async verifyPayment(req, res) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature, order, } = req.body;
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");
        if (generatedSignature !== razorpay_signature) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid signature" });
        }
        try {
            // full payment details from Razorpay API
            const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
            return res.status(200).json({
                success: true,
                message: "Payment Successful",
            });
        }
        catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "Payment verification failed" });
        }
    }
    async createPaymentRecord(req, res) {
        try {
            const { razorpay_payment_id, order } = req.body;
            const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
            const paymentMethod = paymentDetails.method;
            const amount = paymentDetails?.amount / 100;
            const record = await PaymentModel.create({
                order,
                amount,
                status: paymentDetails?.status === "captured" ? "success" : "pending",
                method: paymentMethod,
            });
            if (!record) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "Failed to create payment record!"
                });
            }
            return res.status(HttpCode.success).json({
                status: true,
                message: "Payment record created successfully"
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
}
export default new PaymentController();
//# sourceMappingURL=PaymentController.js.map