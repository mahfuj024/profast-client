import { useForm } from "react-hook-form";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function SendParcel() {

    const { register, handleSubmit, watch, reset } = useForm();
    const [cost, setCost] = useState(null);

    const type = watch("type");

    const onSubmit = (data) => {
        // 📦 Cost calculation logic
        let baseCost = data.type === "document" ? 100 : 150;
        let weightCost = data.type === "non-document" ? data.weight * 20 : 0;
        let totalCost = baseCost + weightCost;

        setCost(totalCost);

        toast(
            (t) => (
                <div className="text-[16px] font-semibold">
                    <p>💰 Delivery Cost: ৳{totalCost}</p>
                    <button
                        onClick={() => {
                            const parcelData = {
                                ...data,
                                totalCost,
                                creation_date: new Date().toISOString(),
                            };
                            console.log("Saved to Database:", parcelData);
                            toast.dismiss(t.id);
                            toast.success("✅ Parcel saved successfully!");
                            reset();
                        }}
                        className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
                    >
                        Confirm
                    </button>
                </div>
            ),
            { duration: 6000 }
        );
    };

    return (
        <div className='mt-4 md:mt-8 bg-white rounded-2xl md:rounded-3xl py-6 md:py-10 lg:py-20 px-6 md:px-9 lg:px-28'>
            {/* <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold'>Add Parcel</h1> */}
            <h1 className="text-[35px] md:text-[44px] lg:text-[56px] font-[800] text-[#03373d]">
                Add Parcel
            </h1>
            {/* divider */}
            <hr class="border-t-1 border-[#0000001A] mt-4 md:mt-6 lg:mt-12" />

            <h2 className='text-[22px] md:text-[25px] lg:text-[28px]  font-[800] text-[#03373d] mt-3 md:mt-5 lg:mt-7'>Enter your parcel details</h2>

            <Toaster />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-6 md:mt-7 lg:mt-8">
                {/* 📦 Parcel Info */}
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="type" className="block text-sm font-medium text-gray-900 cursor-pointer">
                                Type
                            </label>
                            <select
                                id="type"
                                {...register("type", { required: true })}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none"
                            >
                                <option value="" disabled>Select Type</option>
                                <option value="document">Document</option>
                                <option value="non-document">Non-document</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-900 cursor-pointer">
                                Title
                            </label>
                            <input
                                id="title"
                                {...register("title", { required: true })}
                                placeholder="Enter Parcel Title"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none"
                            />
                        </div>

                        {watch("type") === "non-document" && (
                            <div className="space-y-2">
                                <label htmlFor="weight" className="block text-sm font-medium text-gray-900 cursor-pointer">
                                    Weight (kg)
                                </label>
                                <input
                                    id="weight"
                                    type="number"
                                    {...register("weight", {
                                        required: watch("type") === "non-document" ? "Weight is required" : false
                                    })}
                                    placeholder="Enter Weight"
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* divider */}
                <hr className="border-t-1 border-[#0000001A]" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Sender Info */}
                    <div>
                        <h3 className="text-xl mb-6 font-semibold text-gray-900">Sender Info</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="senderName" className="block text-sm font-medium text-gray-900 cursor-pointer">
                                    Name
                                </label>
                                <input
                                    id="senderName"
                                    {...register("senderName", { required: true })}
                                    placeholder="Enter Sender Name"
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="senderContact" className="block text-sm font-medium text-gray-900 cursor-pointer">
                                    Contact
                                </label>
                                <input
                                    id="senderContact"
                                    {...register("senderContact", { required: true })}
                                    placeholder="Enter Sender Contact"
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="senderRegion" className="block text-sm font-medium text-gray-900 cursor-pointer">
                                    Select Region
                                </label>
                                <input
                                    id="senderRegion"
                                    {...register("senderRegion", { required: true })}
                                    placeholder="Enter Sender Region"
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="senderCenter" className="block text-sm font-medium text-gray-900 cursor-pointer">
                                    Select Service Center
                                </label>
                                <input
                                    id="senderCenter"
                                    {...register("senderCenter", { required: true })}
                                    placeholder="Enter Sender Service Center"
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2 lg:col-span-1">
                                <label htmlFor="senderAddress" className="block text-sm font-medium text-gray-900 cursor-pointer">
                                    Address
                                </label>
                                <input
                                    id="senderAddress"
                                    {...register("senderAddress", { required: true })}
                                    placeholder="Enter Sender Address"
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2 lg:col-span-1">
                                <label htmlFor="pickupInstruction" className="block text-sm font-medium text-gray-900 cursor-pointer">
                                    Pick up Instruction
                                </label>
                                <textarea
                                    id="pickupInstruction"
                                    {...register("pickupInstruction", { required: true })}
                                    placeholder="Enter Pick up Instruction"
                                    rows={3}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Receiver Info */}
                    <div>
                        <h3 className="text-xl mb-6 font-semibold text-gray-900">Receiver Info</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="receiverName" className="block text-sm font-medium text-gray-900 cursor-pointer">
                                    Name
                                </label>
                                <input
                                    id="receiverName"
                                    {...register("receiverName", { required: true })}
                                    placeholder="Enter Receiver Name"
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="receiverContact" className="block text-sm font-medium text-gray-900 cursor-pointer">
                                    Contact
                                </label>
                                <input
                                    id="receiverContact"
                                    {...register("receiverContact", { required: true })}
                                    placeholder="Enter Receiver Contact"
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="receiverRegion" className="block text-sm font-medium text-gray-900 cursor-pointer">
                                    Select Region
                                </label>
                                <input
                                    id="receiverRegion"
                                    {...register("receiverRegion", { required: true })}
                                    placeholder="Enter Receiver Region"
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="receiverCenter" className="block text-sm font-medium text-gray-900 cursor-pointer">
                                    Select Service Center
                                </label>
                                <input
                                    id="receiverCenter"
                                    {...register("receiverCenter", { required: true })}
                                    placeholder="Enter Receiver Service Center"
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2 lg:col-span-1">
                                <label htmlFor="receiverAddress" className="block text-sm font-medium text-gray-900 cursor-pointer">
                                    Address
                                </label>
                                <input
                                    id="receiverAddress"
                                    {...register("receiverAddress", { required: true })}
                                    placeholder="Enter Receiver Address"
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2 lg:col-span-1">
                                <label htmlFor="deliveryInstruction" className="block text-sm font-medium text-gray-900 cursor-pointer">
                                    Delivery Instruction
                                </label>
                                <textarea
                                    id="deliveryInstruction"
                                    {...register("deliveryInstruction", { required: true })}
                                    placeholder="Enter Delivery Instruction"
                                    rows={3}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none resize-none"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Submit button*/}
                <button
                    type="submit"
                    className="w-full bg-primary py-3 rounded-lg font-bold text-lg 
             transition-all duration-300 ease-in-out
             hover:bg-primary-dark hover:scale-101 hover:shadow-lg
             cursor-pointer"
                >
                    Submit
                </button>
            </form>

        </div>
    )
}

export default SendParcel