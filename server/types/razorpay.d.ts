declare module 'razorpay' {
    interface RazorpayOrder {
        id: string;
        amount: number;
        currency: string;
    }

    interface RazorpayPayment {
        id: string;
        method: string;
        [key: string]: any;
    }

    class Razorpay {
        constructor(options: { key_id: string; key_secret: string });
        orders: {
            create(options: {
                amount: number;
                currency: string;
                receipt?: string;
            }): Promise<RazorpayOrder>;
        };
        payments: {
            fetch(paymentId: string): Promise<RazorpayPayment>;
        };
    }

    export = Razorpay;
}
