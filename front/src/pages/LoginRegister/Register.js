import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {

  const navigate = useNavigate();

  const [newAccount, setNewAccount] = useState({})

  const inputsHandler = (e) =>{
    let objectContent = newAccount;
    let objectNewContent = {[e.target.name]: e.target.value}
    setNewAccount({...objectContent, ...objectNewContent});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(process.env.React_App_API_LINK + "api/register", newAccount)
      .then((res) => {
        if (res.data === "login successful") {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Box">

      <div className="Box1">
        <h1 className="LogTxtTitle">Bienvenue !</h1>
        <p className="LogTxt">Déjà un compte ?</p>
        <p className="LogTxt">Connecte toi !</p>
        <div className="divbtn">
          <Link className="BtnLog" to="/Login">
            Connection
          </Link>
        </div>
      </div>

      <div className="Box2">
        <h1 className="FormTitle">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-input'>
            <input type="text" name="username" placeholder="Nom d'utilsateur" onChange={inputsHandler} className='input'/>
            <input type="email" name="email" placeholder="Email" onChange={inputsHandler} className='input'/>
            <input type="password" name="password" placeholder="Mot de passe" onChange={inputsHandler} className='input'/>
          </div>
          <button className="btn-form">Send</button>
        </form>
      </div>

    </div>
  );
};

export default Register;