// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useParams, useNavigate } from "react-router";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
// import toast from "react-hot-toast";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
// import ErrorPage from "../../../components/Shared/ErrorPage";
// import { imageUpload } from "../../../utils";

// const EditContest = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const [deadline, setDeadline] = useState(new Date());

//   // ===============================
//   // FORM
//   // ===============================
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   // ===============================
//   // GET CONTEST
//   // ===============================
//   const {
//     data: contest = {},
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["contest", id],
//     queryFn: async () => {
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/contests/${id}`
//       );
//       return res.data;
//     },
//   });

//   // ===============================
//   // PREFILL FORM
//   // ===============================
//   useEffect(() => {
//     if (contest?._id) {
//       setValue("name", contest.name);
//       setValue("description", contest.description);
//       setValue("price", contest.price);
//       setValue("prizeMoney", contest.prizeMoney);
//       setValue("taskInstruction", contest.taskInstruction);
//       setValue("contestType", contest.contestType);

//       const date = new Date(contest.deadline);
//       setDeadline(date);
//       setValue("deadline", date);
//     }
//   }, [contest, setValue]);

//   // ===============================
//   // UPDATE MUTATION
//   // ===============================
//   const updateMutation = useMutation({
//     mutationFn: async (updatedData) =>
//       axios.patch(
//         `${import.meta.env.VITE_API_URL}/contests/${id}`,
//         updatedData
//       ),
//     onSuccess: () => {
//       toast.success("Contest updated successfully");
//       queryClient.invalidateQueries(["contest", id]);
//       queryClient.invalidateQueries(["contests"]);
//       navigate(-1);
//     },
//   });

//   // ===============================
//   // SUBMIT
//   // ===============================
//   const onSubmit = async (data) => {
//     try {
//       let imageUrl = contest.image;

//       if (data.image?.length > 0) {
//         imageUrl = await imageUpload(data.image[0]);
//       }

//       const updatedContest = {
//         name: data.name,
//         image: imageUrl,
//         description: data.description,
//         price: Number(data.price),
//         prizeMoney: Number(data.prizeMoney),
//         taskInstruction: data.taskInstruction,
//         contestType: data.contestType,
//         deadline: data.deadline,
//       };

//       updateMutation.mutate(updatedContest);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (isLoading) return <LoadingSpinner />;
//   if (isError) return <ErrorPage />;

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <div className="bg-base-100 shadow-xl rounded-2xl p-8 border">
//         <h2 className="text-3xl font-bold mb-6 text-center text-primary">
//           Edit Contest
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           {/* Name */}
//           <input
//             {...register("name", { required: true })}
//             className="input input-bordered w-full"
//             placeholder="Contest Name"
//           />

//           {/* Image */}
//           <input
//             type="file"
//             {...register("image")}
//             className="file-input w-full"
//           />
//           <img
//             src={contest.image}
//             alt="preview"
//             className="w-32 rounded mt-2"
//           />

//           {/* Description */}
//           <textarea
//             {...register("description", { required: true })}
//             className="textarea textarea-bordered w-full"
//             placeholder="Description"
//           />

//           {/* Price */}
//           <input
//             type="number"
//             {...register("price", { required: true })}
//             className="input input-bordered w-full"
//             placeholder="Price"
//           />

//           {/* Prize Money */}
//           <input
//             type="number"
//             {...register("prizeMoney", { required: true })}
//             className="input input-bordered w-full"
//             placeholder="Prize Money"
//           />

//           {/* Task Instruction */}
//           <textarea
//             {...register("taskInstruction", { required: true })}
//             className="textarea textarea-bordered w-full"
//             placeholder="Task Instruction"
//           />

//           {/* Contest Type */}
//           <select
//             {...register("contestType", { required: true })}
//             className="select select-bordered w-full"
//           >
//             <option>Design</option>
//             <option>Article Writing</option>
//             <option>Business Idea</option>
//             <option>Gaming Review</option>
//             <option>Photography</option>
//             <option>Other</option>
//           </select>

//           {/* Deadline */}
//           <DatePicker
//             selected={deadline}
//             onChange={(date) => {
//               setDeadline(date);
//               setValue("deadline", date);
//             }}
//             showTimeSelect
//             className="input input-bordered w-full"
//             dateFormat="Pp"
//           />

//           {/* Submit */}
//           <button
//             type="submit"
//             className="btn btn-primary w-full"
//             disabled={updateMutation.isPending}
//           >
//             Update Contest
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditContest;

import React from 'react';

const EditContest = () => {
    return (
        <div>
            Edit contest
        </div>
    );
};

export default EditContest;
