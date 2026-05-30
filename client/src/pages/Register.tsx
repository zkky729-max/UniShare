import { useState } from "react";
import { registerUser } from "../api/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    console.log("REGISTER CLICKED");
    console.log("EMAIL:", email);

    try {
      const res = await registerUser({
        email,
        password,
      });

      console.log("REGISTER SUCCESS:", res.data);

      alert("Account created successfully!");
    } catch (err: any) {
      console.log("REGISTER ERROR:", err);

      if (err.response) {
        console.log(err.response.data);
        alert(JSON.stringify(err.response.data));
      } else {
        alert(err.message);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register TEST 123</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}