import React from "react";
import { Link } from "react-router";

const CustomerOrderDataRow = ({participate}) => {
    const { image, name, contestType, price, status } = participate || {}
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{contestType}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">${price}</p>
      </td>
      {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{quantity}</p>
      </td> */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{status}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">pending</p>
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
