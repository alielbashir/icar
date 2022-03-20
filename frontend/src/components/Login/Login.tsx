import { FormEvent, useState } from "react";
import "./Login.css";
import env from "react-dotenv";
import { Token } from "../App/App.types";

interface LoginProps {
  setToken: (token: Token) => void;
}

interface Credentials {
  username: string;
  password: string;
}

const loginUser = async (credentials: Credentials) => {
  return fetch(env.BACKEND_ADDRESS + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};

const Login = (props: LoginProps) => {
  const { setToken } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
