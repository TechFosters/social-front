import React from 'react';

const ConnectionCard = ({ connection }) => {
  const { firstName, lastName, photoUrl, skills } = connection;

  return (
    <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center gap-4">
        <img
          src={photoUrl || "https://via.placeholder.com/100"}
          alt={`${firstName} ${lastName}`}
          className="w-14 h-14 rounded-full object-cover border border-gray-200"
        />
        <div>
          <h2 className="font-semibold text-gray-800 text-lg">
            {firstName} {lastName}
          </h2>
          <div className="flex flex-wrap gap-2 mt-1">
            {skills?.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
        Message
      </button>
    </div>
  );
};

export default ConnectionCard;
