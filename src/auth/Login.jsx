import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, Navigate } from "react-router";

/** A form that allows users to log into an existing account. */
export default function Login() {
  const { login } = useAuth();

  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const tryLogin = async (formData) => {
    setError(null);

    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await login({ username, password });
      setRedirect(true);
    } catch (e) {
      setError(e.message);
    }
  };

  if (redirect) return <Navigate to="/" />;
  return (
    <>
      <h1>Log in to your account</h1>
      <form action={tryLogin}>
        <label>
          Username
          <input type="text" name="username" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button>Login</button>
        {error && <p role="alert">{error}</p>}
      </form>
      <Link to="/Register">Need an account? Register here.</Link>
    </>
  );
}
