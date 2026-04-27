import useRazorpay from "react-razorpay";

function Razorpay() {
  const [Razorpay] = useRazorpay();

  const handlePayment = async () => {
    // 1. Create order on your server to get 'order_id'
    const order = await fetch("/create-order").then((res) => res.json());

    const options = {
      key: "rzp_test_SfQqx5y2AUfBbB", // Get from Dashboard
      amount: "50000", // Amount in paise (50000 = ₹500)
      currency: "INR",
      name: "Toural",
      description: "Test Transaction",
      order_id: order.id,
      handler: (res) => {
        console.log("Payment Success:", res.razorpay_payment_id);
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return <button onClick={handlePayment}>Pay Now</button>;
}
