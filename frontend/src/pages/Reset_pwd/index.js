import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

export default function Reset_pwd() {
   const location = useLocation();

   const [email, setEmail] = useState(location.state.email);
   const [token, setToken] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   function validatePasswords(pwd, pwd2) {
      return pwd === pwd2;
   }

   const history = useHistory();

   async function handleReset(e) {
      e.preventDefault();

      if (!validatePasswords(password, confirmPassword)) {
         alert("As senhas devem ser iguais.");
         return;
      }

      try {
         await api.post("/auth/reset_password", {
            email,
            token,
            password,
         });

         alert("Sua senha foi alterada com sucesso.");
         history.push("/login");
      } catch (error) {
         console.log(error);
         alert("Não foi possível resetar sua senha.");
      }
   }

   return (
      <div className="container">
         <h1>Redefina sua senha</h1>
         <p className="subtitle">
            Insira o token que recebeu por email e digite a nova senha
         </p>

         <form onSubmit={handleReset}>
            <span>Digite o token</span>
            <input
               placeholder="Token"
               value={token}
               onChange={e => setToken(e.target.value)}
            />
            <span>Digite a senha</span>
            <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={e => setPassword(e.target.value)}
            />
            <span>Digite novamente a senha</span>
            <input
               type="password"
               placeholder="Confirm password"
               value={confirmPassword}
               onChange={e => setConfirmPassword(e.target.value)}
            />

            <button className="button" type="submit">
               Redefinir senha
            </button>

            <Link className="back-link" to="/login">
               <FiLogIn color="#22222e" size={16} />
               Acessar sua conta
            </Link>
         </form>
      </div>
   );
}
