import React from "react";

export const ProfilePictureCard: React.FC = () => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="profile-picture"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <div className="card-actions">
          <button className="btn btn-primary">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};
