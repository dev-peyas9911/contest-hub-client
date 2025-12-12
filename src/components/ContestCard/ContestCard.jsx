import { Link } from "react-router";
import { Users } from "lucide-react"; // optional icon

export function ContestCard({ contest }) {
  const { _id, image, name, description, creator, contestType, price } =
    contest;

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 border rounded-2xl">
      {/* Image */}
      <figure className="relative h-52">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-t-2xl"
        />

        {/* Badge */}
        <div className="absolute top-3 right-3 badge badge-primary px-4 py-3 text-sm">
          {contestType}
        </div>
      </figure>

      {/* Body */}
      <div className="card-body">
        <h2 className="card-title text-xl font-bold">{name}</h2>

        <p className="text-sm text-gray-600">{description.slice(0, 80)}...</p>

        {/* Participants Count (dummy count or from DB) */}
        <div className="flex items-center gap-2 mt-2">
          <Users className="w-4 h-4" />
          <span className="text-sm">
            Participants: {contest.participants || 0}
          </span>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">By: {creator?.name}</p>
          </div>

          <Link
            to={`/contest/${_id}`}
            className="btn btn-outline btn-primary btn-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
