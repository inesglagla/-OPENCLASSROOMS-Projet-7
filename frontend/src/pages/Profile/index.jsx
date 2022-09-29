import axios from "axios";
import NavbarHome from "../../components/NavbarHome";
import { useState, useEffect } from "react";
import '../../styles/profile.css';
import '../../styles/fonts.css';
import logo from '../../assets/logo-solo.png';
import { BiUserCircle } from 'react-icons/bi';
import { MdOutlineEmail } from 'react-icons/md';
import { MdCake } from 'react-icons/md';
import { MdHome } from 'react-icons/md';
import { MdPhoneInTalk } from 'react-icons/md';
import { MdWork } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { MdAdminPanelSettings } from 'react-icons/md';

function Profile() {
    //Récupérer le pseudonyme de l'utilisateur
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
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
            setEmail(res.data.email);
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
                        <p className="profile-email"><MdOutlineEmail size={20}/>{email}</p>
                        <img src={logo} alt='Groupomania' className='profile-logo' />
                    </div>
                    <div className="profile-options">
                        <p className="profile-title">Informations personnelles</p>
                        <div className="profile-infos">
                            <p className="profile-birthday"><MdCake size={20}/>??/??/????</p>
                            <p className="profile-adress"><MdHome size={20}/>3 rue des coquelicots</p>
                            <p className="profile-number"><MdPhoneInTalk size={20}/>01 XX XX XX XX</p>
                            <p className="profile-job"><MdWork size={20}/>Travail dans l'entreprise</p>
                            <p className="profile-join"><IoMdPerson size={20}/>Dans l'entreprise depuis le ??/??/????</p>
                            <p className="profile-role"><MdAdminPanelSettings size={20}/>Admin/Utilisateur/Modérateur</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Profile