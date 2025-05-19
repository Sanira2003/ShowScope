import React, { useState, useEffect } from "react";
import "../css/LoginAndRegister.css";
import { User, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useUserdata } from "../contexts/UserdataContext";
import Loading from "../components/Loading";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, etIsLoading] = useState(false);
  const { currentUser, signupWithGoogle, signupWithFacebook, signup } =
    useAuth();

  const { createUserDocumentIfNotExists } = useUserdata();

  const navigate = useNavigate();

  const isValidEmail = () => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const isPasswordsMatching = () =>
    password === confirmPassword ? true : false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    etIsLoading(true);
    if (isValidEmail() && isPasswordsMatching()) {
      try {
        await signup(email, password);
        await createUserDocumentIfNotExists(currentUser);
        navigate("/");
      } catch (err) {
        setError("Failed to create an account. Email might be already in use.");
        console.log(err);
      } finally {
        etIsLoading(false);
      }
    } else {
      isValidEmail() && setError("Please enter a valid email.");
      isPasswordsMatching() &&
        setError((prev) => `${prev} Passwords cre not matching.`);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setError("");
    etIsLoading(true);
    try {
      const userCredential = await signupWithGoogle();
      const user = userCredential.user;
      await createUserDocumentIfNotExists(user);
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
      setError(err.message || "Failed to login with Google");
    } finally {
      etIsLoading(false);
    }
  };

  const handleFacebookLogin = async (e) => {
    e.preventDefault();
    setError("");
    etIsLoading(true);
    try {
      const userCredential = await signupWithFacebook();
      const user = userCredential.user;
      await createUserDocumentIfNotExists(user);
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
      setError(err.message || "Failed to login with Google");
    } finally {
      etIsLoading(false);
    }
  };

  useEffect(() => {
    currentUser && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="page page-register">
      <div className="login">
        <form>
          <h2>Register</h2>
          <div className="input-box">
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <User className="icon" />
            <span className="input-type">
              <p>Email</p>
            </span>
          </div>
          <div className="input-box">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Lock className="icon" />
            <span className="input-type">
              <p>Password</p>
            </span>
          </div>
          <div className="input-box">
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Lock className="icon" />
            <span className="input-type">
              <p>Confirm Password</p>
            </span>
          </div>

          <p className="error-massage">{error ? error : ""}</p>
          <button type="submit" className="btn" onClick={handleSubmit}>
            Signup
          </button>
          <p>or signup with social platforms</p>
          <div className="social-icons">
            <button onClick={handleGoogleLogin}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 32 32"
              >
                <path d="M 16.003906 14.0625 L 16.003906 18.265625 L 21.992188 18.265625 C 21.210938 20.8125 19.082031 22.636719 16.003906 22.636719 C 12.339844 22.636719 9.367188 19.664063 9.367188 16 C 9.367188 12.335938 12.335938 9.363281 16.003906 9.363281 C 17.652344 9.363281 19.15625 9.96875 20.316406 10.964844 L 23.410156 7.867188 C 21.457031 6.085938 18.855469 5 16.003906 5 C 9.925781 5 5 9.925781 5 16 C 5 22.074219 9.925781 27 16.003906 27 C 25.238281 27 27.277344 18.363281 26.371094 14.078125 Z"></path>
              </svg>
            </button>
            <button onClick={handleFacebookLogin}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 50 50"
              >
                <path d="M32,11h5c0.552,0,1-0.448,1-1V3.263c0-0.524-0.403-0.96-0.925-0.997C35.484,2.153,32.376,2,30.141,2C24,2,20,5.68,20,12.368 V19h-7c-0.552,0-1,0.448-1,1v7c0,0.552,0.448,1,1,1h7v19c0,0.552,0.448,1,1,1h7c0.552,0,1-0.448,1-1V28h7.222 c0.51,0,0.938-0.383,0.994-0.89l0.778-7C38.06,19.518,37.596,19,37,19h-8v-5C29,12.343,30.343,11,32,11z"></path>
              </svg>
            </button>
          </div>
          <Link className="move-link" to={"/login"}>
            <p>
              Already have an account? <u>Login</u>
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
