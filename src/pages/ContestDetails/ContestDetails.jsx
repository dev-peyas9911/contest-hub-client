import React, { useEffect, useState } from "react";
import Container from "../../components/Shared/Container";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const ContestDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const [timeLeft, setTimeLeft] = useState({});

  const [taskText, setTaskText] = useState("");

  // submit
  const { data: registerStatus = {}, isLoading: checkingRegister } = useQuery({
    queryKey: ["registered", id, user?.email],
    enabled: !!user && !!id,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/is-registered/${id}`,
        { withCredentials: true }
      );
      return res.data;
    },
  });
  const isRegistered = registerStatus?.registered;
  // submit

  const { data: contest = {}, isLoading } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/contests/${id}`
      );
      return result.data;
    },
  });
  //   console.log(contest);
  const {
    _id,
    image,
    name,
    description,
    price,
    prizeMoney,
    taskInstruction,
    contestType,
    participants,
    deadline,
    creator,
  } = contest;

  // ----------------------------
  // Countdown Timer
  // ----------------------------
  useEffect(() => {
    if (!deadline) return;

    const target = new Date(deadline).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ expired: true });
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  if (isLoading || checkingRegister) return <LoadingSpinner></LoadingSpinner>;

  const contestEnded = timeLeft?.expired;

  // ----------------------------
  // Submit Task Modal Handler
  // ----------------------------

  const handleSubmitTask = async () => {
    if (!taskText.trim()) {
      toast.error("Submission cannot be empty");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/submit-task`,
        {
          contestId: _id,
          submission: taskText,
        },
        { withCredentials: true }
      );

      toast.success("Task submitted successfully");
      setTaskText("");
      document.getElementById("task_modal").close();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Submission failed");
    }
  };

  // Payment process
  const handlePayment = async () => {
    const paymentInfo = {
      contestId: _id,
      name,
      quantity: 1,
      price,
      description,
      image,
      contestType,
      creator,
      customer: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      paymentInfo,
    );
    
    window.location.href = data.url;
  };

  return (
    <Container>
      <div className="py-10 max-w-5xl mx-auto">
        {/* Contest Name */}
        <h1 className="text-3xl font-bold mb-5">{name}</h1>

        {/* Banner Image */}
        <div className="rounded-xl overflow-hidden shadow-lg mb-6">
          <img
            src={image}
            alt={name}
            className="w-full h-[350px] object-cover"
          />
        </div>

        {/* Participants + Prize + Type */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="p-5 rounded-xl bg-base-200">
            <h2 className="text-xl font-semibold">Participants</h2>
            <p className="text-3xl font-bold">{participants || 0}</p>
          </div>

          <div className="p-5 rounded-xl bg-base-200">
            <h2 className="text-xl font-semibold">Prize Money</h2>
            <p className="text-3xl font-bold">${prizeMoney}</p>
          </div>

          <div className="p-5 rounded-xl bg-base-200">
            <h2 className="text-xl font-semibold">Contest Type</h2>
            <p className="text-lg font-medium">{contestType}</p>
          </div>
        </div>

        {/* Winner Section */}
        {/* {winner && (
          <div className="mb-6 p-5 border rounded-xl bg-success/10">
            <h2 className="text-xl font-bold mb-2">Winner</h2>
            <div className="flex items-center gap-3">
              <img
                src={winner.photo}
                className="w-14 h-14 rounded-full object-cover"
              />
              <p className="text-lg font-semibold">{winner.name}</p>
            </div>
          </div>
        )} */}

        {/* Countdown */}
        <div className="mb-7 p-5 rounded-xl bg-primary/10 text-center">
          {!contestEnded ? (
            <h2 className="text-xl font-bold">
              Time Left: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
              {timeLeft.seconds}s
            </h2>
          ) : (
            <h2 className="text-xl font-bold text-red-500">Contest Ended</h2>
          )}
        </div>

        {/* Full Description */}
        <div className="mb-7">
          <h2 className="text-2xl font-bold mb-3">Description</h2>
          <p className="leading-7 text-gray-700">{description}</p>
        </div>

        {/* Task Instruction */}
        <div className="mb-7">
          <h2 className="text-2xl font-bold mb-3">Task Instructions</h2>
          <p className="leading-7 text-gray-700">{taskInstruction}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          {/* Register / Pay Button */}
          {/* <button
            onClick={handlePayment}
            className={`btn btn-primary ${contestEnded ? "btn-disabled" : ""}`}
          >
            {contestEnded ? "Registration Closed" : `Register $${price}`}
          </button> */}
          <button
            onClick={handlePayment}
            disabled={!user || contestEnded || isRegistered}
            className="btn btn-primary"
          >
            {contestEnded
              ? "Registration Closed"
              : isRegistered
              ? "Registered ✅"
              : `Register $${price}`}
          </button>

          {/* Submit Task Button */}
          <button
            className="btn btn-secondary"
            disabled={!user || !isRegistered || contestEnded}
            onClick={() => document.getElementById("task_modal").showModal()}
          >
            Submit Task
          </button>
        </div>

        {/* Submit Task Modal */}
        <dialog id="task_modal" className="modal">
          <form method="dialog" className="modal-box space-y-4">
            <h3 className="font-bold text-xl">Submit Your Task</h3>

            <textarea
              className="textarea textarea-bordered w-full h-40"
              placeholder="Provide your link(s) and explanation..."
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmitTask}
              >
                Submit
              </button>
              <button className="btn">Close</button>
            </div>
          </form>
        </dialog>
      </div>
    </Container>
  );
};

export default ContestDetails;
