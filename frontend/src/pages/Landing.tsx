import React, { useContext } from "react";
import logo from "../assets/aspire_logo_rough.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Landing = () => {
  const { userId, email } = useContext(AuthContext);
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center">
        <img src={logo} alt="logo" />
        <h2 className="text-9xl">ASPIRE</h2>
      </div>
      {userId ? (
        <Link to="/session" className="btn btn-primary">
          Start session
        </Link>
      ) : (
        <>
          <h5 className="text-4xl">AI-Powered Interview Coach</h5>
          <p className="text-2xl">Elevate your interview game</p>
          <div className="flex flex-col gap-3">
            <Link to="/login" className="btn btn-primary btn-wide">
              Login
            </Link>

            <Link to="/signup" className="btn btn-primary btn-wide">
              Sign Up
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
