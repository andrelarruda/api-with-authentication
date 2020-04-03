import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

export default function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const history = useHistory();

   async function handleLogin(e) {
      e.preventDefault();

      try {
         const response = await api.post("/auth/authenticate", {
            email,
            password,
         });
         console.log("hello");

         localStorage.setItem("userName", response.data.name);
         localStorage.setItem("userEmail", response.data.email);

         history.push("/index");
      } catch (err) {
         console.log(err);
         alert("Não foi possível fazer login. Tente novamente.");
      }
   }

   return (
      <div className="container">
         <h1>Faça o seu login</h1>

         <form onSubmit={handleLogin}>
            <input
               placeholder="Email"
               type="email"
               value={email}
               onChange={e => setEmail(e.target.value)}
            />
            <input
               placeholder="Password"
               type="password"
               value={password}
               onChange={e => setPassword(e.target.value)}
            />

            <button className="button" type="submit">
               Login
            </button>

            <Link
               style={{ marginBottom: 12 }}
               className="back-link"
               to="/forgot_pwd"
            >
               Esqueceu sua senha?
            </Link>

            <Link className="back-link" to="/register">
               <FiLogIn color="#22222e" size={16} />
               Não tenho cadastro
            </Link>
         </form>
      </div>
   );
}
