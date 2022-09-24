import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/navbarhome.css';
import '../styles/fonts.css';
import { BiArrowToLeft } from 'react-icons/bi';
import { BiUserCircle } from 'react-icons/bi';
import { FaHome } from 'react-icons/fa';
import { RiProfileLine } from 'react-icons/ri';

function NavbarHome() {
    //Fonction pour se déconnecter
    function logOut () {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
    };

    //Récupérer le pseudonyme de l'utilisateur
    const [username, setUsername] = useState('');
    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('userId'));
        const token = JSON.parse(localStorage.getItem("token"));
        const fetchUserData = async () => {
            const res = await axios.get (`http://localhost:3000/api/auth/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setUsername(res.data.username);
            };
            fetchUserData();
        }, [])
    
    //Se rendre sur la page Profile et Home
    const navigate = useNavigate();
    function goProfile() {
        navigate("/profile");
    };

    function goHome() {
        navigate("/home");
    };

    return (
        <div className="g-nav">
            <div className='icon-leave' onClick={logOut}>
                <Link to= "/">
                    <BiArrowToLeft size={55}/>
                </Link>
            </div>
            <div className='g-user'>
                <div className="g-nav-icons">
                    <FaHome size={30} onClick={goHome}/>
                    <RiProfileLine size={30} onClick={goProfile}/>
                </div>
                <div className='user-photo'>
                    <BiUserCircle size={55}/>
                </div>
                <div className='user-name'>
                    <p>{username}</p>
                </div>
            </div>
        </div>
    )
}

export default NavbarHome