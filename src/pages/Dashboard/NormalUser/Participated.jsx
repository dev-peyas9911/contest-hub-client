import React from "react";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

import CustomerOrderDataRow from "../../../components/Dashboard/CustomerOrderDataRow";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Participated = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: participates = [], isLoading } = useQuery({
    queryKey: ["participates", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/my-participates`);
      return result.data;
    },
  });
  //   console.log(orders)

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Contest Image
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Contest Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Contest Type
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Price
                  </th>
                  {/* <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Quantity
                  </th> */}
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Submitted Task
                  </th>
                </tr>
              </thead>
              <tbody>
                {participates.map((participate) => (
                  <CustomerOrderDataRow
                    key={participate._id}
                    participate={participate}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participated;
