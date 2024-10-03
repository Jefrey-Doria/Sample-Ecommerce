import React, { useState } from "react";
import "./css/loginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login", formData);
    let responseData;
    await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
      console.log("User Created");
    } else {
      alert(responseData.message);
      console.log("Error Creating User");
    }
  };

  const signup = async () => {
    console.log("Signup", formData);
    let responseData;
    await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/login");
      console.log("User Created");
    } else {
      // alert(responseData.console.errors);
      alert("Error Creating User");
      console.log("Error Creating User");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginSignupContainer">
        <h1>{state}</h1>
        <div className="loginSignupField">
          <i class="bx bxs-user"></i>
          {state === "Sign Up" ? (
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
              placeholder="Username"
            />
          ) : (
            <></>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
          />

          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
          <i class="bx bxs-lock-alt"></i>
        </div>
        {state === "Sign Up" ? (
          <button
            className="signupbtn"
            onClick={() => {
              signup();
            }}>
            Create Account
          </button>
        ) : (
          <button
            onClick={() => {
              login();
            }}>
            Continue
          </button>
        )}
        <div className="loginAgree">
          {state === "Sign Up" ? (
            <>
              <input type="checkbox" />
              <p>I agree to the terms and conditions of the website.</p>
            </>
          ) : (
            <>
              <input type="checkbox" />
              <p>Remember me</p>
            </>
          )}
        </div>
        {state === "Sign Up" ? (
          <p className="withAccount">
            Already have an account?
            <span
              onClick={() => {
                setState("Login");
              }}>
              {" "}
              Login
            </span>
          </p>
        ) : (
          <p className="withAccount">
            Don't have an account?
            <span
              onClick={() => {
                setState("Sign Up");
              }}>
              {" "}
              Register
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
