import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { createContext, PropsWithChildren, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../config/axios";
import { findUser } from "../config/user-service";

type UserData = {
  first_name: string;
  last_name: string;
  email: string;
  engineering_discipline: string;
  field_of_interest: string[];
};
// Context
export const AuthContext = createContext<{
  userId: null | string;
  email: null | string;
  userData: UserData | null;
  setUserId: (userId: null | string) => void;
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  signUpError: null | string;
  signInError: null | string;
  logout: () => void;
  loading: boolean;
}>({
  userId: null,
  email: null,
  userData: null,
  signUpError: null,
  signInError: null,
  setUserId: () => console.log("Function not defined"),
  signIn: () => console.log("Function not defined"),
  signUp: () => console.log("Function not defined"),
  logout: () => console.log("Function not defined"),
  loading: true,
});

// Provider
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [signInError, setSignInError] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(credentials);
      // const userData = await findUser(credentials.user.uid);
      // setUserData({
      //   first_name: userData.first_name,
      //   last_name: userData.last_name,
      //   email: userData.email,
      //   engineering_discipline
      // });
    } catch (error: any) {
      setSignInError(error.code);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(credentials);

      // Get the user info back from local storage and save it to DB
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        // Save parsedUserInfo to DB or use it as needed
        await api.post("/create_user", {
          first_name: parsedUserInfo.firstName,
          last_name: parsedUserInfo.lastName,
          email: parsedUserInfo.email,
          engineering_discipline: parsedUserInfo.discipline,
          firebase_id: credentials.user.uid,
          field_of_interest: parsedUserInfo.fieldOfInterest,
        });
      }
    } catch (error: any) {
      setSignUpError(error.code);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const setUser = async (credentials: UserCredential) => {
    const user = credentials.user;
    const token = await user.getIdToken();
    setEmail(user.email);
    setToken(token);
    setUserId(user.uid);
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    setToken(null);
    setUserId(null);
    setEmail(null);
    setLoading(false);
    setUserData(null);
  };

  // useEffect(() => {
  //   if (userId) {
  //     navigate("/");
  //   } else {
  //     navigate("/login");
  //   }
  // }, [userId]);

  // useEffect(() => {
  //   if (location.pathname === "/signup") {
  //     setSignUpError(null);
  //   } else if (location.pathname === "/login") {
  //     setSignInError(null);
  //   }
  // }, [location]);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setEmail(user.email);
        setUserId(user.uid);
        const token = await user.getIdToken();
        setToken(token);
        const userData = await findUser(user.uid);
        console.log("🚀 ~ onAuthStateChanged ~ userData:", userData);
        setUserData({
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          engineering_discipline: userData.engineering_discipline,
          field_of_interest: userData.field_of_interest,
        });
      } else {
        logout();
      }
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        email,
        userId,
        userData,
        setUserId,
        signIn,
        signUp,
        logout,
        signInError,
        signUpError,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
