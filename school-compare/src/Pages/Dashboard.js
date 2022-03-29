import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../PagesCSS/Dashboard/Dashboard.css";
import avatar from "../PagesCSS/Dashboard/avatar.png";
import {
  auth, //db,
  logout,
  updateNamePhoto,
  updateUserEmail,
  deleteAccount,
} from "../Firebase";
import { toast } from "react-toastify";
function Dashboard() {
  const [currentUser, isLoading /* , err*/] = useAuthState(auth);
  const [name, setName] = useState("name");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(avatar);
  const [photoURL, setPhotoURL] = useState(avatar);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // ORIGINAL
  // const fetchUserName = async () => {
  //   try {
  //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setName(data.name);
  //   } catch (err) {
  //     console.error(err);
  //     alert("An error occured while fetching user data");
  //   }
  // };
  // useEffect(() => {
  //   if (loading) return;
  //   if (!user) return navigate("/");
  //   fetchUserName();
  // }, [user, loading]);
  // END ORIGINAL

  useEffect(() => {
    let isSubscribed = true;
    console.log("in useEffect");
    if (isLoading) {
      console.log("in useEffect: isLoading");
      return;
    }
    if (!currentUser) {
      toast("Please log in to view dashboard", { type: "info" });
      navigate("/login");
    }

    if (isSubscribed) {
      if (currentUser) {
        setName(currentUser.displayName);
        console.log("currentUser.displayName: ", currentUser.displayName);
        setEmail(currentUser.email);
      }
      if (currentUser?.photoURL) {
        setPhoto(currentUser.photoURL);
        setPhotoURL(currentUser.photoURL);
      } else {
        console.log("no photoURl");
      }
    }
    return () => (isSubscribed = false);
  }, [currentUser, isLoading, navigate]);

  function handleChangePhoto(e) {
    if (e.target.files[0]) {
      setPhotoURL(e.target.files[0]);
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleSave() {
    //TODO don't allow when name and email are empty
    updateUserEmail(email, setError, setLoading);
    console.log(loading, error);
    if (!loading && !error) {
      setError(false);
      if (photoURL === avatar) {
        console.log("photoURL = avatar");
        setPhotoURL(avatar);
      }
      updateNamePhoto(name, photoURL, setLoading);
      console.log("Saved name and photo");
    }
  }

  function handleCancel() {}

  function handleDelete() {
    deleteAccount(setLoading);
  }

  // useEffect(() => {
  //   if (currentUser) {
  //     setName(currentUser.displayName);
  //     console.log("currentUser.displayName: ", currentUser.displayName);
  //     setEmail(currentUser.email);
  //   }
  //   if (currentUser?.photoURL) {
  //     setPhoto(currentUser.photoURL);
  //     setPhotoURL(currentUser.photoURL);
  //   } else {
  //     console.log("no photoURl");
  //   }
  // }, [currentUser]);

  // console.log("displayName: ", name);
  // console.log("photoURL: ", photoURL);
  // console.log("photo: ", photo);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <span className="dashboard-details">Dashboard</span>
        {/* <div>{name}</div>
        <div>{currentUser?.email}</div> */}
        <button className="dashboard-logout-btn" onClick={logout}>
          Logout
        </button>

        <div>
          <input
            type="file"
            onChange={handleChangePhoto}
            className="dashboard-attachment"
          />
          <img src={photo} alt="Avatar" className="dashboard-img" />
        </div>

        <input
          type="text"
          value={name == null ? "" : name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="dashboard-name"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
          className="dashboard-email"
        />

        <button
          disabled={loading}
          onClick={handleSave}
          className="dashboard-buttons"
        >
          Save changes
        </button>
        <button
          disabled={loading}
          onClick={handleCancel}
          className="dashboard-buttons"
        >
          Cancel
        </button>
        <button
          disabled={loading}
          onClick={handleDelete}
          className="dashboard-buttons"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
export default Dashboard;
