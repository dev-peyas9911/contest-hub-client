import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { imageUpload } from "../../../utils";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../../components/Shared/ErrorPage";

export default function AddContestPage() {
  const { user } = useAuth();

  // useMutation hook useCase (POST || PUT || PATCH || DELETE)
  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      // await axios.post(`${import.meta.env.VITE_API_URL}/contests`, payload)
      await axios.post(
        `${import.meta.env.VITE_API_URL}/contest-requests`,
        payload
      ),
    onSuccess: (data) => {
      console.log(data);
      // show toast
      toast.success("Contest submitted! Waiting for admin approval.");
      // navigate to my inventory page
      mutationReset();
      // Query key invalidate
    },
    onError: (error) => {
      console.log(error);
    },
    onMutate: (payload) => {
      console.log("I will post this data--->", payload);
    },
    onSettled: (data, error) => {
      console.log("I am from onSettled--->", data);
      if (error) console.log(error);
    },
    retry: 3,
  });

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [deadline, setDeadline] = useState(new Date());

  const onSubmit = async (data) => {
    const {
      name,
      image,
      description,
      price,
      prizeMoney,
      taskInstruction,
      contestType,
      deadline,
    } = data;
    const imageFile = image[0];

    try {
      const imageUrl = await imageUpload(imageFile);
      const contestData = {
        image: imageUrl,
        name,
        description,
        price: Number(price),
        prizeMoney: Number(prizeMoney),
        taskInstruction,
        contestType,
        deadline,
        creator: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };
      // const { data } = await axios.post(
      //   `${import.meta.env.VITE_API_URL}/contests`,
      //   contestData
      // );
      // console.log(data);
      await mutateAsync(contestData);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  if (isPending) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <ErrorPage></ErrorPage>;
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-base-100 shadow-xl rounded-2xl p-8 border border-base-300">
        <h2 className="text-3xl font-bold mb-6 text-primary text-center">
          Add New Contest
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Contest Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter contest name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="label">Photo</label>
            <input
              type="file"
              className="file-input"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">Image is required</p>
            )}
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Description</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Write contest description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">Description is required</p>
            )}
          </div>

          {/* Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Price</span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="input input-bordered w-full"
              placeholder="Contest price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">Price is required</p>
            )}
          </div>

          {/* Prize Money */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Prize Money</span>
            </label>
            <input
              type="number"
              {...register("prizeMoney", { required: true })}
              className="input input-bordered w-full"
              placeholder="Prize money"
            />
            {errors.prizeMoney && (
              <p className="text-red-500 text-sm">Prize money is required</p>
            )}
          </div>

          {/* Task Instruction */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Task Instruction</span>
            </label>
            <textarea
              {...register("taskInstruction", { required: true })}
              className="textarea textarea-bordered h-28"
              placeholder="Write task instruction"
            />
            {errors.taskInstruction && (
              <p className="text-red-500 text-sm">
                Task instruction is required
              </p>
            )}
          </div>

          {/* Contest Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Contest Type</span>
            </label>
            <select
              {...register("contestType", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select contest type</option>
              <option>Design</option>
              <option>Article Writing</option>
              <option>Business Idea</option>
              <option>Gaming Review</option>
              <option>Photography</option>
              <option>Other</option>
            </select>
            {errors.contestType && (
              <p className="text-red-500 text-sm">Contest type is required</p>
            )}
          </div>

          {/* Deadline */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Deadline</span>
            </label>
            <DatePicker
              selected={deadline}
              onChange={(date) => {
                setDeadline(date);
                setValue("deadline", date);
              }}
              className="input input-bordered w-full"
              showTimeSelect
              dateFormat="Pp"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Create Contest"}
          </button>
        </form>
      </div>
    </div>
  );
}
