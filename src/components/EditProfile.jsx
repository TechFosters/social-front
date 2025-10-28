import React, { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../utils/userSlice";
import Toast from "./Toast";

const EditProfile = ({user}) => {

  const [firstName, setFirstName] = useState(user?.data?.firstName || "");
  const [lastName, setLastName] = useState(user?.data?.lastName || "");
  const [about, setAbout] = useState(user?.data?.about || "");
  const [age, setAge] = useState(user?.data?.age || "");
  const [gender, setGender] = useState(user?.data?.gender || "") ;
  const [photoUrl, setPhotoUrl] = useState(user?.data?.photoUrl || "") ;
  const [error, setError] = useState("")
  const [toastMessage, setToastMessage] = useState("");
  const dispatch = useDispatch()
  const handleSave = async () => {
    setError('')
    console.log({
      firstName,
      lastName,
      about,
      age,
      gender,
      photoUrl,
    });

    try {
        const res = await axios.patch(BASE_URL+"/profile/edit", {firstName,
            lastName,
            about,
            age,
            gender,
            photoUrl},{withCredentials: true})
        
            
            dispatch(
                updateUser({
                  firstName,
                  lastName,
                  about,
                  age,
                  gender,
                  photoUrl,
                })
              )
           setToastMessage(res.data.message);

           // clear toast automatically after 3s
           setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
        console.error("Profile Edit error: ", err)
        setError("❌ Edit failed: " + (err.response?.data?.error || err.message));
        setToastMessage("Something went wrong!");
        setTimeout(() => setToastMessage(""), 3000);
    }
  

};
  

  return (
<div className="flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-64px)] gap-10 p-6 bg-base-200">
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-9">
        <legend className="ffieldset-legend text-lg font-semibold mb-2 text-center">Edit Profile</legend>

        <label className="label">First Name</label>
        <input
        type="text"
        className="input"
        placeholder="First Name"
        value={firstName}
        onChange={(e)=>setFirstName(e.target.value)}
        />

       <label  className="label">Last Name</label>
       <input type="text" 
       className="input" 
       placeholder="Last Name"
       value={lastName}
       onChange={(e)=>setLastName(e.target.value)}
       />

        
        <label  className="label">Age</label>
        <input type="text" 
        className="input"
        placeholder="Age"
        value={age}
        onChange={(e)=>setAge(e.target.value)}
        />

        <label className="label">Gender</label>
        <input
          type="text"
          className="input"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />

        <label className="label">Photo URL</label>
        <input
          type="text"
          className="input"
          placeholder="Image URL"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />

        <label className="label">About</label>
        <input type="text" 
        className="input" 
        placeholder="About"
        value={about}
        onChange={(e)=>setAbout(e.target.value)}/>

        <button className="btn btn-accent mt-4" onClick={handleSave}>
          Save Profile
        </button>

        {error && (
          <p className="text-center mt-2 text-sm text-red-600">{error}</p>
        )}
      </fieldset>
    </div>

    <UserCard
  firstName={firstName}
  lastName={lastName}
  about={about}
  age ={age}
  photoUrl={photoUrl}
  skills={user?.data?.skills || []}
/>

<Toast message={toastMessage} />
    </div>
  );
};

export default EditProfile;

