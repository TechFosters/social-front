import React from "react";

const UserCard = ({ user, firstName, lastName, about, photoUrl, skills = [] }) => {
  // fallback to props if user not passed
  const effectiveFirstName = firstName || user?.firstName || "";
  const effectiveLastName = lastName || user?.lastName || "";
  const effectiveAbout = about || user?.about || "";
  const effectivePhotoUrl = photoUrl || user?.photoUrl || null;
  const effectiveSkills = skills.length ? skills : user?.skills || [];

  return (
    <div className="card bg-base-200 w-80 shadow-md hover:shadow-xl transition-shadow duration-200">
      {effectivePhotoUrl ? (
        <figure>
          <img
            src={effectivePhotoUrl}
            alt={`${effectiveFirstName} ${effectiveLastName}`}
            className="h-64 w-full object-cover"
          />
        </figure>
      ) : (
        <div className="h-64 w-full flex items-center justify-center bg-gray-100 text-gray-400">
          No Image
        </div>
      )}

      <div className="card-body">
        <h2 className="card-title">
          {effectiveFirstName || "First Name"} {effectiveLastName || ""}
        </h2>


        {effectiveSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {effectiveSkills.map((skill, index) => (
              <span key={index} className="badge badge-accent badge-outline">
                {skill}
              </span>
            ))}
          </div>
        )}

        {effectiveAbout && (
          <p className="text-sm mt-2 text-gray-600">{effectiveAbout}</p>
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
