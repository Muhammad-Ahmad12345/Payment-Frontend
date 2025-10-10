import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/PaymentForm";
import { FaCreditCard } from "react-icons/fa";

const stripePromise = loadStripe("pk_test_51SGlw75hdSXL5dQP7A9XLJvK1ZSQVLgxfP9kbIg243m1laQ6VJ21mx30hBgKNTxyyY5X3skyq8zxNbkvI07O2JOW00kzPMIpwP");

export default function PaymentPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <div className="text-center mb-6">
         <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
  <FaCreditCard className="text-blue-600" /> Make a Payment
</h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter your card details to proceed securely
          </p>
        </div>

        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </div>
    </div>
  );
}
