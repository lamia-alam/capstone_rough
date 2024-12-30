import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { firebaseErrorToMessage } from "../config/user-service";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, signInError, userId } = useContext(AuthContext);

  if (userId) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <h2>Login</h2>

      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </label>

      <label className="input input-bordered flex items-center gap-2">
        <input
          type="password"
          className="grow"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </label>
      <button
        className="btn btn-primary"
        onClick={() => {
          signIn(email, password);
        }}
      >
        Login
      </button>
      {signInError && (
        <div className="p-3 text-red-600">
          <p>{firebaseErrorToMessage(signInError)}</p>
        </div>
      )}
      <p>
        Don't have an account?{" "}
        <Link className="underline text-primary" to="/signup">
          Sign Up
        </Link>
      </p>
    </div>
  );
};
