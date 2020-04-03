import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

export default function Register() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const history = useHistory();

   async function handleRegister(e) {
      e.preventDefault();

      try {
         const response = await api.post("/auth/register", {
            name,
            email,
            password,
         });

         alert(`Seu Id de acesso: ${response.data.id}`);

         history.push("/login");
      } catch (err) {
         console.log(err);
         alert("Não foi possível cadastrar.");
      }
   }

   return (
      <div className="container">
         <h1>Faça o seu cadastro</h1>
         <form onSubmit={handleRegister}>
            <input
               placeholder="Name"
               value={name}
               onChange={e => {
                  setName(e.target.value);
               }}
            />
            <input
               placeholder="Email"
               type="email"
               value={email}
               onChange={e => {
                  setEmail(e.target.value);
               }}
            />
            <input
               placeholder="Password"
               type="password"
               value={password}
               onChange={e => {
                  setPassword(e.target.value);
               }}
            />
            <button className="button" type="submit">
               Cadastrar
            </button>

            <Link className="back-link" to="/login">
               <FiArrowLeft size={16} color={"#22222E"} />
               Já tem cadastro? Faça o login
            </Link>
         </form>
      </div>
   );
}
