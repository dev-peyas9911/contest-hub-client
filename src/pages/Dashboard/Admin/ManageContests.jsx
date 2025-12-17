import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ErrorPage from "../../../components/Shared/ErrorPage";

const ManageContests = () => {
  const queryClient = useQueryClient();

  // ============================
  // GET ALL CONTEST REQUESTS
  // ============================
  const {
    data: requests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contest-requests"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/contest-requests`
      );
      return res.data;
    },
  });

  // ============================
  // APPROVE CONTEST
  // ============================
  const approveMutation = useMutation({
    mutationFn: async (id) =>
      axios.patch(
        `${import.meta.env.VITE_API_URL}/contest-requests/approve/${id}`
      ),
    onSuccess: () => {
      toast.success("Contest approved & published");
      queryClient.invalidateQueries(["contest-requests"]);
    },
  });

  // ============================
  // DELETE / REJECT CONTEST
  // ============================
  const deleteMutation = useMutation({
    mutationFn: async (id) =>
      axios.delete(
        `${import.meta.env.VITE_API_URL}/contest-requests/${id}`
      ),
    onSuccess: () => {
      toast.success("Contest request rejected");
      queryClient.invalidateQueries(["contest-requests"]);
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Manage Contest Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">
          No pending contest requests
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Contest</th>
                <th>Type</th>
                <th>Creator</th>
                <th>Price</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((contest, index) => (
                <tr key={contest._id}>
                  <td>{index + 1}</td>

                  <td className="flex items-center gap-3">
                    <img
                      src={contest.image}
                      alt={contest.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <span className="font-semibold">
                      {contest.name}
                    </span>
                  </td>

                  <td>{contest.contestType}</td>

                  <td>
                    <p className="font-medium">{contest.creator?.name}</p>
                    <p className="text-sm text-gray-500">
                      {contest.creator?.email}
                    </p>
                  </td>

                  <td>${contest.price}</td>

                  <td>
                    {new Date(contest.deadline).toLocaleDateString()}
                  </td>

                  <td>
                    <span className="badge badge-warning">
                      Pending
                    </span>
                  </td>

                  <td className="flex gap-2">
                    <button
                      onClick={() =>
                        approveMutation.mutate(contest._id)
                      }
                      className="btn btn-success btn-sm"
                      disabled={approveMutation.isPending}
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() =>
                        deleteMutation.mutate(contest._id)
                      }
                      className="btn btn-error btn-sm"
                      disabled={deleteMutation.isPending}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageContests;
