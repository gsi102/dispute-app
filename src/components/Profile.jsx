import React from "react";
import { useSelector } from "react-redux/es/exports";

const Profile = () => {
  const userData = useSelector((state) => state.users.userData);

  return (
    <div>
      <label>
        <strong>ID:</strong>
      </label>
      <p>{userData.id}</p>
      <label>
        <strong>Email:</strong>
      </label>
      <p>{userData.email}</p>
      <label>
        <strong>Login:</strong>
      </label>
      <p>{userData.login}</p>
      <label>
        <strong>Name:</strong>
      </label>
      <p>{userData.name}</p>
      <label>
        <strong>Surname:</strong>
      </label>
      <p>{userData.surname}</p>
      <label>
        <strong>Location:</strong>
      </label>
      <p>{userData.location}</p>
      <label>
        <strong>Ocupation:</strong>
      </label>
      <p>{userData.ocupation}</p>
    </div>
  );
};

export default Profile;
