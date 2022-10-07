import axios from "axios";
import { useState, useEffect } from "react";
import '../styles/fonts.css';
import '../styles/comments.css';
import { GiTalk } from 'react-icons/gi';
import { BiUserCircle } from 'react-icons/bi';

function ShowComment({userId, commentContent}) {
    //Récupérer les données de celui qui a envoyé le commentaire
    const [username, setUsername] = useState();
    const [avatar, setAvatar] = useState();
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        const fetchUserData = async () => {
            const res = await axios.get (`http://localhost:3000/api/auth/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setUsername(res.data.username);
            setAvatar(res.data.picture);
        };
        fetchUserData();
    }, [userId])

    //Conditions concernant l'avatar de l'utilisateur
    const [showAvatar, setShowAvatar] = useState('');

    useEffect(() => {
        const verifyPic = async () => {
            if (avatar === null) {
                setShowAvatar(<BiUserCircle size={55}/>);
            } else {
                setShowAvatar(<img src={avatar} alt='avatar' className='profile-avatarShow'/>);
            }
        };
        verifyPic();
    }, [avatar])

    return (
        <div className="coms-one">
            <div className='coms-top'>
                <p className="coms-username"><GiTalk size={20}/>{username}</p>
            </div>
            <div className="coms-bot">
                <div className="coms-usericon">
                    {showAvatar}
                </div>
                <div className="coms-text">
                    <p className="coms-content">{commentContent}</p>
                </div>
            </div>
        </div>
    )
}

export default ShowComment