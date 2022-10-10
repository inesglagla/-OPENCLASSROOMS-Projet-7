import axios from "axios";
import moment from 'moment';
import 'moment/locale/fr';
import NavbarHome from "../../components/NavbarHome";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../styles/profile.css';
import '../../styles/fonts.css';
import logo from '../../assets/logo-solo.png';
import Avatar from "../../components/Avatar";
import { MdOutlineEmail } from 'react-icons/md';
import { MdCake } from 'react-icons/md';
import { MdHome } from 'react-icons/md';
import { MdPhoneInTalk } from 'react-icons/md';
import { MdWork } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { MdAdminPanelSettings } from 'react-icons/md';
import { MdOutlineSendAndArchive } from 'react-icons/md';

function Profile() {
    let { id } = useParams();

    //Récupérer le pseudonyme de l'utilisateur
    const [userData, setUserData] = useState([]);
    const [admin, setAdmin] = useState('');
    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('userId'));
        const token = JSON.parse(localStorage.getItem("token"));
        const fetchUserData = async () => {
            const res = await axios.get (`http://localhost:3000/api/auth/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setUserData(res.data);
            setAdmin(res.data.isAdmin);
        };
        fetchUserData();
    }, [])

    //Définir le rôle
    const [role, setRole] = useState('');
    useEffect(() => {
        const verifyAdmin = async () => {
            if (admin === true) {
                setRole('Administrateur');
            } else {
                setRole('Utilisateur');
            }
        };
        verifyAdmin();
    }, [admin])

    //Modifier l'avatar de l'utilisateur
    const [file, setFile] = useState();
    function handlePic(e) {
        setFile(e.target.files[0]);
    }

    function changePic(e) {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem("token"));
        const changePicFormData = new FormData();
        changePicFormData.append("image", file);
        axios.put(`http://localhost:3000/api/auth/users/${id}`, changePicFormData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            console.log(res);
            window.location.reload();
        })
        .catch((error)=> {
            console.log(error);
        });
    };

    //Affichage des dates
    moment.locale('fr');
    const dateBirthday = userData.birthday;
    const dateShowBirthday = moment(dateBirthday, 'DD.MM.YYYY').format('L');
    const dateJob = userData.jobdate;
    const dateShowJob = moment(dateJob, 'DD.MM.YYYY').format('L');

    return (
            <div className="profile-page">
                <NavbarHome userPic={userData.picture}/>
                <div className="profile-bloc">
                    <div className="profile-user">
                        <div className="profile-usericon">
                            <div className="profile-avatarsvg">
                                <Avatar userPic={userData.picture}/>
                            </div>
                            <div className="profile-change">
                                <div className="profile-changepic">
                                    <label htmlFor="file">Changer l'avatar</label>
                                    <input className="profile-bouton" onChange={(e) => handlePic(e)} type="file" id="file" name="file" accept=".jpg,.jpeg,.png"/>
                                </div>
                                <div className="profile-send">
                                    <MdOutlineSendAndArchive size={30} onClick={(e) => changePic(e)}/>
                                </div>
                            </div>
                        </div>
                        <div className="profile-bot">
                            <p className="profile-username">{userData.username}</p>
                            <p className="profile-email"><MdOutlineEmail size={20}/>{userData.email}</p>
                            <img src={logo} alt='Groupomania' className='profile-logo' />
                        </div>
                    </div>
                    <div className="profile-options">
                        <p className="profile-title">Informations personnelles</p>
                        <div className="profile-infos">
                            <p className="profile-birthday"><MdCake size={20}/>{dateShowBirthday}</p>
                            <p className="profile-adress"><MdHome size={20}/>{userData.adress}</p>
                            <p className="profile-number"><MdPhoneInTalk size={20}/>{userData.phone}</p>
                            <p className="profile-job"><MdWork size={20}/>{userData.job}</p>
                            <p className="profile-join"><IoMdPerson size={20}/>{dateShowJob}</p>
                            <p className="profile-role"><MdAdminPanelSettings size={20}/>{role}</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Profile