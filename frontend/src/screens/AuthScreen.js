import React, { useState } from "react";

export const AuthScreen = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const signUp = () => {};
  const login = () => {};
  return (
    <div className="container">
      <div className="form-container sign-up-container">
        <form action={signUp}>
          <h1>Create account</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-twitter-square"></i>
            </a>
            <a href="#">
              <i className="fab fa-google"></i>
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="User name" value={userName} />
          <input type="email" placeholder="Email" value={email} />
          <input type="password" placeholder="Password" value={password} />
          <input
            type="password"
            placeholder="Confirm password"
            value={password2}
          />
        </form>
      </div>
      <div className="form-container login-container">
        <form action={login}>
          <h1>Login</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="social">
              <i className="fab fa-twitter-square"></i>
            </a>
            <a href="#">
              <i className="fab fa-google"></i>
            </a>
          </div>
          <span>or login with your email</span>
          <input type="email" placeholder="Email" value={email} />
          <input type="password" placeholder="Password" value={password} />
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-login">hello again</div>
          <div className="overlay-panel overlay-sign-up">register</div>
        </div>
      </div>
    </div>
  );
};
