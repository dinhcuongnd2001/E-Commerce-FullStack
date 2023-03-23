import React, { useState } from "react";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const handleClick = () => {
    console.log(form);
  };
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          name="email"
          placeholder="Email"
          type="text"
        />

        <input
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          name="password"
          placeholder="Password"
          type="password"
        />

        <button type="submit" onClick={handleClick}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
