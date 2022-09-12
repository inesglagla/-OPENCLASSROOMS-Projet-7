import React from "react";
import '../../styles/fonts.css';
import '../../styles/connexion.css';
import logo from '../../assets/logo-solo.png';
import Navbar from "../../components/Navbar";

function Connexion() {
    return (
    <div>
      <Navbar />
        <div className="container-co">
          <img src={logo} alt='Groupomania' className='g-logo-solo' />
          <div className="text-co">
            <h1>Bienvenue sur le réseau social de l'entreprise Groupomania!</h1>
            <h2>Veuillez vous connecter ou vous inscrire pour y accéder.</h2>
          </div>
        </div>
    </div>
  )
}

export default Connexion