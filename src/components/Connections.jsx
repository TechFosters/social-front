import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import ConnectionCard from './ConnectionCard';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.error('Error fetching connections: ', err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return <p className="text-center text-gray-600 mt-10">No connections found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold mb-4">Your Connections</h1>
      {connections.map((connection) => (
        <ConnectionCard key={connection._id} connection={connection} />
      ))}
    </div>
  );
};

export default Connections;
