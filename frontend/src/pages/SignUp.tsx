import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

const allDisciplines = [
  "SOFTWARE",
  "ELECTRICAL",
  "MECHANICAL",
  "CIVIL",
  "COMPUTER",
  "CHEMICAL",
  "INDUSTRIAL",
];

const allFieldsOfInterest = [
  "Artificial Intelligence",
  "Augmented Reality",
  "Automotive",
  "Biomedical",
  "Cloud Computing",
  "Cybersecurity",
  "Data Science",
  "Drones",
  "Electric Vehicles",
  "Internet of Things",
  "Machine Learning",
  "Mobile Development",
  "Robotics",
  "Virtual Reality",
];

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [fieldOfInterest, setFieldOfInterest] = useState<String[]>([]);

  const saveToLocalStorage = () => {
    const userInfo = {
      email,
      firstName,
      lastName,
      discipline,
      fieldOfInterest,
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  };

  const { signUp, signUpError, userId } = useContext(AuthContext);

  if (userId) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <h2>Sign Up</h2>

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

      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </label>

      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </label>

      <select
        className="select select-bordered"
        value={discipline}
        onChange={(e) => setDiscipline(e.target.value)}
      >
        <option disabled selected>
          Engineering Discipline
        </option>
        {allDisciplines.map((each) => (
          <option key={each} value={each}>
            {each}
          </option>
        ))}
      </select>

      <details className="dropdown">
        <summary className="select select-bordered flex items-center w-full">
          Field of interest
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          {allFieldsOfInterest.map((field) => (
            <li>
              <label className="cursor-pointer label">
                <span className="label-text">{field}</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-warning"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFieldOfInterest([...fieldOfInterest, field]);
                    } else {
                      setFieldOfInterest(
                        fieldOfInterest.filter((f) => f !== field)
                      );
                    }
                  }}
                />
              </label>
            </li>
          ))}
        </ul>
      </details>

      <button
        className="btn btn-primary"
        onClick={() => {
          saveToLocalStorage();
          signUp(email, password);
        }}
      >
        Sign Up
      </button>
      {signUpError && (
        <div className="p-3 text-red-600">
          <p>Oops. Something went wrong. Please try again.</p>
        </div>
      )}
      <p>
        Already have an account?{" "}
        <Link className="underline text-primary" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};
