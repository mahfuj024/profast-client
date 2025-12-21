import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from 'sweetalert2';
import { FaEye, FaCreditCard, FaTrashAlt } from 'react-icons/fa';


function MyParcel() {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?email=${user.email}`
      );
      return res.data;
    },
  });

  if (loading || isLoading) {
    return <div>Loading...</div>;
  }

  // 1. Delete Handler with SweetAlert2 Confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          axiosSecure.delete(`/parcels/${id}`)
            .then(res => {
              if (res.data?.deletedCount) {
                // Show Success Message
                Swal.fire({
                  title: "Deleted!",
                  text: "The parcel has been removed successfully.",
                  icon: "success",
                  timer: 1500
                });
              }
              refetch();
            })
        }
        catch (error) {
          Swal.fire("Error!", "Could not delete the parcel.", "error");
        }
      }
    });
  };

  return (
    <div className="mt-4 md:mt-8 bg-white rounded-xl md:rounded-2xl py-6 md:py-10 lg:py-14 px-4 md:px-8 lg:px-24">
      {/* Header with Total Count */}
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight">
          My Parcels
        </h2>

      </div>

      <div className="overflow-hidden">
        {/* Desktop Table View */}
        <table className="hidden md:table w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-100">
              <th className="py-4 text-left text-lg font-extrabold text-gray-400 w-12">#</th>
              <th className="py-4 text-left text-lg font-extrabold text-gray-800">Title</th>
              <th className="py-4 text-left text-lg font-extrabold text-gray-800">Type</th>
              <th className="py-4 text-left text-lg font-extrabold text-gray-800">Created At</th>
              <th className="py-4 text-left text-lg font-extrabold text-gray-800">Cost</th>
              <th className="py-4 text-left text-lg font-extrabold text-gray-800">Payment</th>
              <th className="py-4 text-center text-lg font-extrabold text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody className="text-base font-medium">
            {parcels.map((parcel, index) => (
              <tr key={parcel.id} className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors">
                <td className="py-5 pr-6 text-gray-400 font-bold">{index + 1}</td>
                <td className="py-5 font-bold text-gray-900">{parcel.title || 'N/A'}</td>
                <td className="py-5 capitalize text-gray-800">{parcel.type}</td>
                <td className="py-5 text-gray-800">{new Date(parcel.creation_date).toLocaleDateString()}</td>
                <td className="py-5 font-bold text-gray-900 text-lg">৳{parcel.totalCost}</td>
                <td className="py-5">
                  <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${parcel.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                    {parcel.payment_status}
                  </span>
                </td>
                <td className="py-5">
                  <div className="flex justify-center items-center gap-3">
                    <button className="flex items-center gap-2 px-3 py-2 border-2 border-blue-50 hover:bg-blue-50 text-info rounded-lg text-sm font-bold">
                      <FaEye size={16} /> View
                    </button>
                    {parcel.payment_status === 'unpaid' && (
                      <button className="flex items-center gap-2 px-3 py-2 border-2 border-green-50 hover:bg-green-50 text-success rounded-lg text-sm font-bold">
                        <FaCreditCard size={16} /> Pay
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className="flex items-center gap-2 px-3 py-2 border-2 border-red-50 hover:bg-red-50 text-error rounded-lg text-sm font-bold"
                    >
                      <FaTrashAlt size={16} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile "Card" View */}
        <div className="md:hidden flex flex-col gap-5">
          {parcels.map((parcel, index) => (
            <div key={parcel.id} className="relative border-2 border-gray-50 rounded-2xl p-5 shadow-sm bg-white">
              <div className="absolute -top-3 -left-3 bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white">
                {index + 1}
              </div>
              <div className="flex justify-between items-start mb-4">
                <div className="ml-6">
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-black">Parcel Title</p>
                  <p className="text-xl font-black text-gray-900 mb-4 mt-1">{parcel.title || 'N/A'}</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black">Type</p>
                  <p className="text-base font-bold capitalize text-gray-700">{parcel.type}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${parcel.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                  {parcel.payment_status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <p className="text-xs text-gray-400 font-black uppercase">Date</p>
                  <p className="text-base font-bold text-gray-700">{new Date(parcel.creation_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-black uppercase">Cost</p>
                  <p className="text-lg font-black text-gray-900">৳{parcel.totalCost}</p>
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-100 py-3 rounded-xl text-info text-sm font-black">
                  <FaEye size={14} /> View
                </button>
                {parcel.payment_status === 'unpaid' && (
                  <button className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-100 py-3 rounded-xl text-success text-sm font-black">
                    <FaCreditCard size={14} /> Pay
                  </button>
                )}
                <button
                  onClick={() => handleDelete(parcel._id)}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-100 py-3 rounded-xl text-error text-sm font-black"
                >
                  <FaTrashAlt size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

}

export default MyParcel;
