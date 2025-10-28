import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="card bg-base-200 w-80 shadow-md hover:shadow-xl transition-shadow duration-200">
      <figure>
        <img
          src={user?.photoUrl}
          alt={`${user?.firstName} ${user?.lastName}`}
          className="h-64 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {user?.firstName} {user?.lastName}
        </h2>

        {user?.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {user.skills.map((skill, index) => (
              <span key={index} className="badge badge-accent badge-outline">
                {skill}
              </span>
            ))}
          </div>
        )}

        {user?.about && (
          <p className="text-sm mt-2 text-gray-600">{user.about}</p>
        )}

        <div className="card-actions justify-end mt-3">
          <button className="btn btn-sm btn-primary">Interested</button>
          <button className="btn btn-sm btn-secondary">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
