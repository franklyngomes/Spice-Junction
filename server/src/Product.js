import TshirtImg from "./tshirt.svg";

function Product() {
   const handlePayment = async () => {
        try {
            const res = await fetch('http://localhost:5000/create-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 1290 }),
            });

            const { razorpayOptions } = await res.json();
            razorpayOptions.handler = async function (response) {
                const verifyRes = await fetch('http://localhost:5000/verify-payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(response),
                });

                const verifyData = await verifyRes.json();

                if (verifyData.success) {
                  const paymentRecord = await fetch('http://localhost:5000/create-payment-record', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      razorpay_payment_id:response.razorpay_payment_id,
                      order: "68bea9b51a3871015b45f6cb"
                    }),
                });
                    alert('Payment successful and verified!');
                } else {
                    alert('Payment verification failed!');
                }
            };

            const rzp = new (window).Razorpay(razorpayOptions);
            rzp.open();
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Payment could not be initiated');
        }
    };
  return (
    <div className="product">
      <h2>Tshirt</h2>
      <p>Solid blue cotton Tshirt</p>
      <img src={TshirtImg} />
      <br />
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
}

export default Product;
