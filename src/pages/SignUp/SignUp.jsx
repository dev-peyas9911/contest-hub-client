import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
// import { auth } from "../firebase/firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const SignUp = () => {
  const [show, setShow] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  //   Sign in
  const onSubmit = async (data) => {
    // console.log(data);
    const { name, image, email, password } = data;
    const imageFile = image[0];

    try {
      const imageURL = await imageUpload(imageFile);

      //1. User Registration
      const result = await createUser(email, password);

      // 2. Generate image url from selected file

      //3. Save username & profile photo
      await updateUserProfile(name, imageURL);

      navigate(from, { replace: true });
      toast.success("Signup Successful");

      console.log(result);
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      await signInWithGoogle();

      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="card-body flex justify-center items-center">
      <h2 className="text-3xl font-bold text-center">Register here!</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          {/* Name */}
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              placeholder="Your Name"
              {...register("name", {
                required: "Name is required",
                maxLength: {
                  value: 20,
                  message: "Name cannot be too long",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          {/* Image */}
          <div>
            <label className="label">Photo</label>
            <input type="file" className="file-input" {...register("image")} />
          </div>
          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address.",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="relative">
            <label className="label">Password</label>
            <input
              type={show ? "text" : "password"}
              className="input"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute top-8 right-3 z-10 cursor-pointer"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-neutral mt-4">
            Register
          </button>
          <p>
            Already have an account?{" "}
            <Link className="text-green-500 font-semibold" to="/login">
              Login
            </Link>{" "}
            here
          </p>
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="btn bg-white text-black w-full border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUp;
