import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams()
  const axiosSecure = useAxiosSecure()

  const [error, setError] = useState("")

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ['parcels', parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`)
      return res.data;
    }
  })

  if (isPending) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  }

  const amount = parcelInfo.totalCost
  const amountInCents = amount * 100

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message)
    } else {
      setError("")
      console.log(paymentMethod);
    }

    // create payment intent
    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      parcelId
    })

    const clientSecret = res.data?.clientSecret

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Jenny Rosen"
        }
      }
    })
    if (result.error) {
      console.log(result.error.message)
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("payment succeeded!")
        console.log(result)
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-1 md:p-0">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-semibold text-center mb-6">
          Parcel Payment
        </h2>

        {/* Card Input */}
        <div className="border border-gray-300 rounded-md p-3 mb-6">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#111827",
                  "::placeholder": {
                    color: "#9ca3af",
                  },
                },
                invalid: {
                  color: "#dc2626",
                },
              },
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-primary py-3 rounded-md font-semibold transition disabled:opacity-50 cursor-pointer"
        >
          Pay ৳{amount}
        </button>

        {/* show error message */}
        {
          error && <p className="text-center text-red-600 font-medium mt-4">{error}</p>
        }
      </form>
    </div>
  );
}

export default PaymentForm;





