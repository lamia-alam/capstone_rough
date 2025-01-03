import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { storage } from "../config/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { AuthContext } from "./AuthContext";

type FileContextType = {
  profileImageUrl: string;
  fetchProfileImage: () => void;
};

export const FileContext = createContext<FileContextType>({
  profileImageUrl:
    "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  fetchProfileImage: () => {
    console.log("fetchProfileImage function not provided");
  },
});

export const FileProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { userId } = useContext(AuthContext);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>(
    "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
  );
  const fetchProfilePicture = async () => {
    if (!userId) return;
    const storageRef = ref(storage, `${userId}/profile.jpg`);
    const url = await getDownloadURL(storageRef);
    setProfilePictureUrl(url);
  };

  useEffect(() => {
    fetchProfilePicture();
  }, [userId]);

  return (
    <FileContext.Provider
      value={{
        profileImageUrl: profilePictureUrl,
        fetchProfileImage: fetchProfilePicture,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
