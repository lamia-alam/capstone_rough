import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const ProfileInfoCard: React.FC = () => {
  const { userData } = useContext(AuthContext);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">User Information</h2>
        <div>
          <p className="text-lg">
            Name:
            <span className="text-primary">
              {userData.first_name + " " + userData.last_name}
            </span>
          </p>
          <p className="text-lg">
            Email: <span className="text-primary">{userData.email}</span>
          </p>
          <p className="text-lg">
            Discipline:
            <span className="text-primary">
              {userData.engineering_discipline}
            </span>
          </p>
          <p className="text-lg">
            Field of interest:
            <span className="text-primary">
              {userData.field_of_interest.join(", ")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
