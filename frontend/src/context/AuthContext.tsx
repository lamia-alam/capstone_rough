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

// Context
export const AuthContext = createContext<{
  userId: null | string;
  email: null | string;
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
    } catch (error: any) {
      setSignInError(error.message);
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
      console.log("🚀 ~ signUp ~ error:", error);
      setSignUpError(error.message);
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
