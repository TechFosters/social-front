import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'

const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector((store) => store.feed)

  const getFeed = async () => {
    try {
      if (feed?.length) return; // avoid duplicate API calls
      
      const res = await axios.get(`${BASE_URL}/user/suggestions`, {
        withCredentials: true,
      });

      const feedData = res?.data?.data || []; // ✅ safe access
      console.log("Feed Data:", feedData);
      
      dispatch(addFeed(feedData));
    } catch (err) {
      console.error("Feed Fetch error:", err);
    }
  };

  useEffect(() => {
   
     
       getFeed();
    
  }, []);

  return (
    <div>
      <h2>Feed</h2>
      {feed && feed.length > 0 ? (
        feed.map((item) => (
          <div key={item._id}>
            <img src={item.photoUrl} width={50} height={50} alt="user" />
            <p>{item.firstName} {item.lastName}</p>
          </div>
        ))
      ) : (
        <p>No suggestions found</p>
      )}
    </div>
  );
};

export default Feed;
