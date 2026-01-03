import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  // 📦 Load parcel info
  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  // 💰 Amount calculation
  const amount = Math.round(parcelInfo.totalCost || 0);
  const amountInCents = amount * 100;

  // 💳 Payment submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    try {
      const card = elements.getElement(CardElement);
      if (!card) return;

      // 1️⃣ Create payment method
      const { error: pmError } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (pmError) {
        setError(pmError.message);
        return;
      } else {
        setError("");
      }

      // 2️⃣ Create payment intent
      const intentRes = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
      });

      const clientSecret = intentRes.data?.clientSecret;
      if (!clientSecret) throw new Error("Client secret missing");

      // 3️⃣ Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        return;
      }

      // 4️⃣ Payment success
      if (result.paymentIntent.status === "succeeded") {
        const paymentData = {
          parcelId,
          email: user?.email,
          amount,
          transactionId: result.paymentIntent.id,
          paymentMethod: "card",
        };

        const paymentRes = await axiosSecure.post("/payments", paymentData);

        if (paymentRes.data?.paymentResult?.insertedId) {
          toast.success("Payment successful!");

          setTimeout(() => {
            navigate("/myParcel");
          }, 1500);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-semibold text-center mb-6">
          Parcel Payment
        </h2>

        <div className="border p-3 rounded mb-4">
          <CardElement />
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-primary py-3 rounded font-semibold disabled:opacity-50 cursor-pointer"
        >
          Pay ৳{amount}
        </button>

        {error && (
          <p className="text-red-600 text-center mt-3 font-medium">{error}</p>
        )}
      </form>
    </div>
  );
}

export default PaymentForm;
