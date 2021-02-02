import React, { useState, useEffect } from "react";

export const AuthScreen = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [activeScreen, setActiveScreen] = useState("login");

  const signUp = () => {};
  const login = () => {};
  const submitAuthHandler = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(e.target.className);
    const targetForm = e.target;
    const classes = targetForm.className.split(" ");
    const isSendFormClicked = classes[classes.length - 1] === "active";
    if (isSendFormClicked) {
      // validate and send form
    } else {
      // update isFirstLoad
      setIsFirstLoad(false);
      // toggle screens
      setActiveScreen(activeScreen === "login" ? "signup" : "login");
    }
  };
  return (
    <div className="cards-container">
      <form
        onSubmit={submitAuthHandler}
        className={`mm-card log-in-card ${
          activeScreen === "login" ? "mm-active" : "mm-disabled"
        } `}
      >
        <div className="mm-card-content">
          <h2>Welcome back, MemorEasy Friend!</h2>
          <div className="social-container">
            <span>Login with</span>
            <a href="#" className="social">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-twitter-square"></i>
            </a>
            <a href="#">
              <i className="fab fa-google"></i>
            </a>
            <span> OR enter</span>
          </div>
          <div className="mm-form-container">
            <div className="email">
              <input type="text" placeholder="Email" />
            </div>
            <div className="password">
              <input type="password" placeholder="Password" />
            </div>
            <div className="secondary-text-input">
              <a href="#" className="forgot-pass-btn">
                Forgot Password?
              </a>
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
          </div>
        </div>
        <div className="mm-card-footer">
          <button type="submit" className="btn btn-success login-btn">
            Log in
          </button>
        </div>
      </form>

      <form
        onSubmit={submitAuthHandler}
        className={`mm-card sign-up-card ${
          activeScreen === "signup" ? "mm-active" : "mm-disabled"
        }`}
      >
        <div className="mm-card-content">
          <h2>Start Your MemorEasy Journey</h2>
          <div className="social-container">
            <span>Login with</span>
            <a href="#" className="social">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-twitter-square"></i>
            </a>
            <a href="#">
              <i className="fab fa-google"></i>
            </a>
            <span> OR enter</span>
          </div>
          <div className="mm-form-container">
            <div className="fullname">
              <input type="text" placeholder="User Name" />
            </div>
            <div className="email">
              <input type="email" placeholder="Email" />
            </div>
            <div className="password">
              <input type="password" placeholder="Password" />
            </div>
          </div>
        </div>
        <div className="mm-card-footer">
          <button type="submit" className="btn btn-success signup-btn">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
