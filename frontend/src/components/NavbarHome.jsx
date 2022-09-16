import axios from "axios";
import { useState, useEffect, Fragment } from "react";
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
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('userId'));
        const token = JSON.parse(localStorage.getItem("token"));
        const fetchUserData = async () => {
            const res = await axios.get (`http://localhost:3000/api/auth/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setUserData([res.data]);
            };
            fetchUserData();
        }, [])

    return (
        <div className="g-nav">
            <div className='icon-leave' onClick={logOut}>
                <Link to= "/">
                    <BiArrowToLeft size={55}/>
                </Link>
            </div>
            <div className='g-user'>
                <div className='user-photo'>
                    <BiUserCircle size={55}/>
                </div>
                {userData.map((item) => (
                    <Fragment key= {item._id}>
                        <div className='user-name'>
                            <p>{item.username}</p>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default NavbarHome