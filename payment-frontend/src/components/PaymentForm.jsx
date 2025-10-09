import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setMessage("Processing payment...");

    try {
      // 🔹 Step 1: Ask backend to create a PaymentIntent
      const res = await fetch("http://localhost:4000/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1000 }), // Example: 1000 = $10.00
      });

      const data = await res.json();

      if (!data.clientSecret) {
        setMessage("Error creating payment intent");
        return;
      }

      // 🔹 Step 2: Confirm the card payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: { card: elements.getElement(CardElement) },
        }
      );

      if (error) {
        setMessage(error.message);
      } else if (paymentIntent.status === "succeeded") {
        setMessage("✅ Payment successful!");
      }
    } catch (err) {
      setMessage("❌ Something went wrong.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="border p-3 rounded-md" />
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Pay
      </button>
      <p className="text-center text-gray-600 mt-2">{message}</p>
    </form>
  );
}
