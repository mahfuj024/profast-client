import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEye, FaCreditCard, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // <-- useNavigate import

function MyParcel() {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate(); // <-- useNavigate initialization

  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  if (loading || isLoading) {
    return <div>Loading...</div>;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/parcels/${id}`);
        if (res.data?.deletedCount) {
          Swal.fire("Deleted!", "", "success");
          refetch();
        }
      }
    });
  };

  // <-- SPA navigation, no reload
  const handlePay = (id) => {
    navigate(`/payment/${id}`);
  };

  return (
    <div className="min-h-screen mt-4 md:mt-8 bg-white font-semibold rounded-xl md:rounded-2xl py-6 md:py-10 lg:py-14 px-4 md:px-8 lg:px-24">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight">
          My Parcels
        </h2>
      </div>

      <div className="overflow-hidden">
        {/* ================= Desktop / Laptop Table ================= */}
        <table className="hidden md:table w-full border-collapse text-sm md:text-base">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Created At</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td className="opacity-70">{index + 1}</td>
                <td>{parcel.title || "N/A"}</td>
                <td>{parcel.type}</td>
                <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>
                <td>৳{parcel.totalCost}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${parcel.payment_status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>
                <td>
                  <div className="flex flex-row gap-2 flex-wrap">
                    <button className="flex items-center justify-center gap-2 px-3 py-2 border-2 border-blue-50 hover:bg-blue-50 text-info rounded-lg text-sm font-bold">
                      <FaEye size={16} /> View
                    </button>

                    {parcel.payment_status === "unpaid" && (
                      <button
                        onClick={() => handlePay(parcel._id)}
                        className="flex items-center justify-center gap-2 px-3 py-2 border-2 border-green-50 hover:bg-green-50 text-success rounded-lg text-sm font-bold"
                      >
                        <FaCreditCard size={16} /> Pay
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className="flex items-center justify-center gap-2 px-3 py-2 border-2 border-red-50 hover:bg-red-50 text-error rounded-lg text-sm font-bold"
                    >
                      <FaTrashAlt size={16} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ================= Mobile Card View ================= */}
        <div className="md:hidden flex flex-col gap-2">
          {parcels.map((parcel, index) => (
            <div key={parcel._id} className="relative p-3">
              {/* Index number */}
              <div className="absolute -top-2 -left-2 bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border border-white">
                {index + 1}
              </div>

              <div className="flex justify-between mb-1">
                <h3 className="font-bold">{parcel.title || "N/A"}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${parcel.payment_status === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    }`}
                >
                  {parcel.payment_status}
                </span>
              </div>

              <p className="text-sm">Type: {parcel.type}</p>
              <p className="text-sm">
                Date: {new Date(parcel.creation_date).toLocaleDateString()}
              </p>
              <p className="font-bold mt-1">৳{parcel.totalCost}</p>

              {/* Mobile buttons: nowrap, one line */}
              <div className="flex flex-row flex-nowrap gap-2 mt-2 overflow-x-auto">
                <button className="flex-shrink-0 flex items-center justify-center gap-1 border-2 py-2 px-2 rounded-lg text-sm font-semibold">
                  <FaEye size={14} /> View
                </button>

                {parcel.payment_status === "unpaid" && (
                  <button
                    onClick={() => handlePay(parcel._id)}
                    className="flex-shrink-0 flex items-center justify-center gap-1 border-2 py-2 px-2 rounded-lg text-sm font-semibold text-success"
                  >
                    <FaCreditCard size={14} /> Pay
                  </button>
                )}

                <button
                  onClick={() => handleDelete(parcel._id)}
                  className="flex-shrink-0 flex items-center justify-center gap-1 border-2 py-2 px-2 rounded-lg text-sm font-semibold text-error"
                >
                  <FaTrashAlt size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyParcel;
