import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const FAQ = () => {
  const { userId } = useContext(AuthContext);
  return (
    <div>
      <p>FAQ</p>
      <p>{userId}</p>
    </div>
  );
};
