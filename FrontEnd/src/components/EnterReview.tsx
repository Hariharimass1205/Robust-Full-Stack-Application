"use client";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import bg from "../../public/240_F_287113569_12KPHNVT0eDYos0LvgaZsbuy5H2xf1BW.jpg";
import { submitData } from "@/service/api";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { IUserData } from "@/utils/types";

export default function EnterReview({ stateChange }:{stateChange:(value:boolean)=>void} ) {
  const [limit, setLimit] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUserData>();

  const onSubmit:SubmitHandler<IUserData> = async (data: IUserData) => {
    const res = await submitData(data);
    //console.log(res)
    if (res.limit) {
      setLimit(true);
      setTimeout(() => {
        stateChange(false);
      }, 2000);
    }
    if (res.success) {
      stateChange(false);
      toast.success("Form submitted successfully!", { position: "top-right" });
    }
  };

  const labels = [
    "Very Bad", "Bad", "Not Good", "Okay", "Good",
    "Very Good", "Excellent", "Outstanding", "Exceptional", "Perfect"
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      <Image
        src={bg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
         <ToastContainer />
      <div className="bg-none-400 p-8 rounded-lg w-4xl flex justify-between gap-8 text-white">
        <div className="w-full">
          <h1 className="text-6xl font-bold text-center mb-10">User Feedback Form</h1>
          {limit && <small className="text-red-500 left-2.5">User can only post 5 reviews</small>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-medium">Your Name </label>
              <input
                type="text"
                {...register("Name", {
                  required: "Name is required",
                  validate: (value) => value.trim() !== "" || "Name cannot be empty or just spaces"
                })}
                className="w-full p-2 border rounded"
              />
              {errors.Name && <small className="text-red-500">{String(errors.Name.message)}</small>}
            </div>

            <div>
              <label className="block font-medium">How often do you use this app?</label>
              <select {...register("usage", { required: "This field is required" })} className="w-full p-2 border rounded focus:bg-amber-500">
                <option  className="active:bg-amber-500" value="">Select an option</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
                <option value="First time">First time</option>
              </select>
              {errors.usage && <small className="text-red-500">{String(errors.usage.message)}</small>}
            </div>

            <div>
              <label className="block font-medium">Main app goal?</label>
              <select {...register("userGoal", { required: "This field is required" })} multiple className="w-full p-2 border rounded ">
                <option value="Information">Information</option>
                <option value="Chat">Chat</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Buy">Buy</option>
                <option value="Socialize">Socialize</option>
                <option value="Other">Other</option>
              </select>
              {errors.userGoal && <small className="text-red-500">{String(errors.userGoal.message)}</small>}
            </div>

            <div>
              <label className="block font-medium">Rate your experience (1-10):</label>
              <input type="range" {...register("rateUserValue", { required: true })} min="1" max="10" className="w-full" />
              <p className="text-center font-semibold mt-2">
                {watch("rateUserValue") || 5} ({labels[(watch("rateUserValue") || 5) - 1]})
              </p>
            </div>

            <div>
              <label className="block font-medium">Suggest any improvements:</label>
              <input
                type="text"
                {...register("suggestion", {
                  required: "Suggestion is required",
                  validate: (value) => value.trim() !== "" || "Suggestion cannot be empty or just spaces"
                })}
                className="w-full p-2 border rounded"
              />
              {errors.suggestion && <small className="text-red-500">{String(errors.suggestion.message)}</small>}
            </div>

            <div>
             <label className="block font-medium">Enter your birthday:</label>
             <input
             type="date"
             {...register("birthday", { required: "This field is required" })}
             className="w-full p-2 border rounded"
              max={new Date().toISOString().split("T")[0]} // Restricts to today or earlier
              />
              {errors.birthday && <small className="text-red-500">{String(errors.birthday.message)}</small>}
            </div>


            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
              Submit
            </button>
            <button type="button" onClick={() => stateChange(false)} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
