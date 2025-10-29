import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);


  const reviewRequest = async(status, id)=>{
    try{
        const res = await axios.post(`${BASE_URL}/request/review/${status}/${id}`,{}, {withCredentials: true})
         //Remove reviewed request from state instantly
        const updatedRequests = requests.filter((r) => r._id !== id);
        dispatch(addRequest(updatedRequests));
    }catch(err){
        console.error("Review Error: ", err);
    }
  }
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log("Requests API:", res?.data?.data);
      console.log("requests", requests)
      dispatch(addRequest(res?.data?.data || []));
    } catch (err) {
      console.error("Request Error: ", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <p className="text-lg font-semibold text-gray-500">
          No pending requests 😊
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-wrap justify-center gap-6">
      {requests.map((req, idx) => {
        const user = req.fromUserId;
        return (
          <div
            key={req._id || idx}
            className="card bg-base-200 w-80 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <figure>
              <img
                src={user?.photoUrl || "https://via.placeholder.com/150"}
                alt={`${user?.firstName} ${user?.lastName}`}
                className="h-64 w-full object-cover rounded-t-xl"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">
                {user?.firstName} {user?.lastName}
              </h2>

              {user?.skills?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.skills.map((skill, i) => (
                    <span key={i} className="badge badge-accent badge-outline">
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <div className="card-actions justify-between items-center mt-4">
                <button className="btn btn-sm btn-success w-1/2" onClick={()=>reviewRequest('accepted', req._id)}>Accept</button>
                <button className="btn btn-sm btn-error w-1/2" onClick={()=>reviewRequest('rejected', req._id)}>Reject</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
