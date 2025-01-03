import React, { useContext, useEffect, useRef } from "react";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../../context/AuthContext";
import { FileContext } from "../../context/FileContext";
export const ProfilePictureCard: React.FC = () => {
  const { userId } = useContext(AuthContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const { fetchProfileImage, profileImageUrl } = useContext(FileContext);
  const uploadFile = (file: File) => {
    try {
      const storageRef = ref(storage, `${userId}/profile.jpg`);
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!", snapshot);
        fetchProfileImage();
      });
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={profileImageUrl}
          alt="profile-picture"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <div className="card-actions">
          <button
            className="btn btn-primary"
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.click();
              }
            }}
          >
            Upload Profile
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                uploadFile(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
