import axios from "axios";
import NavbarHome from "../../components/NavbarHome";
import { useState, useEffect } from "react";
import { BiUserCircle } from 'react-icons/bi';
import '../../styles/profile.css';
import '../../styles/fonts.css';

function Profile() {
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
    
    return (
            <div className="profile-page">
                <NavbarHome/>
                <div className="profile-bloc">
                    <div className="profile-user">
                        <div className="profile-usericon">
                            <BiUserCircle size={200}/>
                        </div>
                        <p className="profile-username">{username}</p>
                    </div>
                    <div className="profile-options">
                        
                    </div>
                </div>
            </div>
    )
}

export default Profile