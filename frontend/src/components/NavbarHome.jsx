import { Link } from "react-router-dom";
import '../styles/navbarhome.css';
import '../styles/fonts.css';
import { BiArrowToLeft } from 'react-icons/bi';
import { BiUserCircle } from 'react-icons/bi';

function NavbarHome() {
    //Fonction pour se déconnecter
    function logOut () {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    };

    //Récupérer le pseudonyme de l'utilisateur

    return (
        <div className="g-nav">
                <div className='icon-leave' onClick ={logOut}>
                    <Link to= "/">
                        <BiArrowToLeft size={55}/>
                    </Link>
                </div>
                <div className='g-user'>
                    <div className='user-photo'>
                        <BiUserCircle size={55}/>
                    </div>
                    <div className='user-name'>
                        <p>Username</p>
                    </div>
                </div>
        </div>
    )
}

export default NavbarHome