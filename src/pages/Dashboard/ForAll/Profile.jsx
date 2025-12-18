// import React from "react";
// import useAuth from "../../../hooks/useAuth";
// import useRole from "../../../hooks/useRole";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

// const Profile = () => {
//   const { user } = useAuth();
//   const [role, isRoleLoading] = useRole();
//   // const { role, isRoleLoading } = useRole()
//   // console.log(role, isRoleLoading);
//   if (isRoleLoading) return <LoadingSpinner></LoadingSpinner>;
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
//         <img
//           alt="cover photo"
//           src="https://images.template.net/wp-content/uploads/2014/11/pink_flowers_facebook_cover.jpg"
//           className="w-full mb-4 rounded-t-lg h-56"
//         />
//         <div className="flex flex-col items-center justify-center p-4 -mt-16">
//           <a href="#" className="relative block">
//             <img
//               alt="profile"
//               src={user?.photoURL}
//               className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
//             />
//           </a>

//           <p className="p-2 px-4 text-xs text-white bg-primary rounded-full">
//             {role}
//           </p>
//           <p className="mt-2 text-xl font-medium text-gray-800 ">
//             User Id: {user?.uid}
//           </p>
//           <div className="w-full p-2 mt-4 rounded-lg">
//             <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
//               <p className="flex flex-col">
//                 Name
//                 <span className="font-bold text-gray-600 ">
//                   {user?.displayName}
//                 </span>
//               </p>
//               <p className="flex flex-col">
//                 Email
//                 <span className="font-bold text-gray-600 ">{user?.email}</span>
//               </p>

//               <div>
//                 <button className="bg-primary  px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-blue-500 block mb-1">
//                   Update Profile
//                 </button>
//                 {/* <button className="bg-primary px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-blue-500">
//                   Change Password
//                 </button> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import useAuth from "../../../hooks/useAuth";
// import useRole from "../../../hooks/useRole";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
// import axiosSecure from "../../../hooks/useAxiosSecure";
// import { imageUpload } from "../../../utils/imageUpload";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { imageUpload } from "../../../utils";
import { updateProfile } from "firebase/auth";

const Profile = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();
  const axiosSecureInstance = useAxiosSecure();

  const [openModal, setOpenModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      bio: user?.bio || "",
    },
  });

  if (isRoleLoading) return <LoadingSpinner />;

  const handleUpdateProfile = async (data) => {
    try {
      setUpdating(true);

      let imageUrl = user?.photoURL;

      // Upload image if selected
      if (data.image?.[0]) {
        imageUrl = await imageUpload(data.image[0]);
      }

      const updatedInfo = {
        name: data.name,
        bio: data.bio,
        image: imageUrl,
      };

      await axiosSecureInstance.patch("/user/profile", updatedInfo);

      // 2️⃣ Update Firebase Auth
      await updateProfile(user, {
        displayName: data.name,
        photoURL: imageUrl,
      });

      toast.success("Profile updated successfully");
      setOpenModal(false);
      reset();
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
        {/* Cover Image */}
        <img
          alt="cover"
          src="https://images.template.net/wp-content/uploads/2014/11/pink_flowers_facebook_cover.jpg"
          className="w-full mb-4 rounded-t-lg h-56 object-cover"
        />

        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          {/* Profile Image */}
          <img
            alt="profile"
            src={user?.photoURL}
            className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white"
          />

          {/* Role */}
          <p className="p-2 px-4 mt-2 text-xs text-white bg-primary rounded-full">
            {role}
          </p>

          {/* User ID */}
          <p className="mt-2 text-sm text-gray-500">User Id: {user?.uid}</p>

          {/* Info Section */}
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <p className="flex flex-col">
                Name
                <span className="font-bold">{user?.displayName}</span>
              </p>

              <p className="flex flex-col">
                Email
                <span className="font-bold">{user?.email}</span>
              </p>

              <div>
                <button
                  onClick={() => setOpenModal(true)}
                  className="bg-primary px-10 py-1 rounded-lg text-white hover:bg-blue-500"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {openModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Update Profile</h3>

            <form
              onSubmit={handleSubmit(handleUpdateProfile)}
              className="space-y-4"
            >
              {/* Name */}
              <input
                {...register("name", { required: true })}
                className="input input-bordered w-full"
                placeholder="Your name"
              />

              {/* Bio */}
              <textarea
                {...register("bio")}
                className="textarea textarea-bordered w-full"
                placeholder="Short bio"
                rows="3"
              />

              {/* Image */}
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="file-input file-input-bordered w-full"
              />

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updating}
                  className="btn btn-primary"
                >
                  {updating ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Profile;
