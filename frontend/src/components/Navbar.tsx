import { Link } from "react-router-dom";
import React, { useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FileContext } from "../context/FileContext";
import { useLocation } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const Navbar = () => {
  const { userId, logout } = useContext(AuthContext);
  const { profileImageUrl } = useContext(FileContext);
  const dropdownMenuRef = useRef(null);

  const location = useLocation();

  // TODO - make the dropdown disappear when clicking one of the links in the dropdown
  // https://medium.com/@malikhamzav/how-to-close-daisyui-dropdown-on-click-ea65c5749410

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Aspire
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/getting-started">Getting Started</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
        </ul>
        {userId ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={profileImageUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>

              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};
