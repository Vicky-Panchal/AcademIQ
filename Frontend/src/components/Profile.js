import React, { useEffect, useState } from "react";
import '../styles/profile.css';
import NavBar from "./NavBar";

function Profile() {
  // Mock user data (you might fetch this from an API)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main St, City, Country",
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleInputChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = () => {
    setEditMode(false);
    // Save updated user data
    window.localStorage.setItem("loggedInUser", JSON.stringify(user));
    console.log("Updated User Data:", user);
  };

  const handleLogout = () => {
    // Your logout logic here
    console.log("Logged out");
  };

  return (
    <div className="account-page">
      {user && <NavBar user={user} setUser={setUser} />}
      <h1>Account Details</h1>
      <div className="user-details">
        <label>
          Name:
          {editMode ? (
            <input
              type="text"
              name="name"
              value={user.name || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.name}</span>
          )}
        </label>
        <label>
          Email:
          <span>{user.email}</span>
        </label>
        <label>
          Address:
          {editMode ? (
            <input
              type="text"
              name="address"
              value={user.address || ""}
              onChange={handleInputChange}
            />
          ) : (
            <span>{user.address}</span>
          )}
        </label>
      </div>
      <div className="actions">
        {editMode ? (
          <button onClick={handleSaveProfile}>Save Profile</button>
        ) : (
          <button onClick={handleEditProfile}>Edit Profile</button>
        )}
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default Profile;
