import axios from "axios";
import { useState, useEffect } from "react";
import '../styles/fonts.css';
import '../styles/comments.css';
import { BiUserCircle } from 'react-icons/bi';
import { GiTalk } from 'react-icons/gi';

function Comments() {
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
        <div className="coms-bloc">
            <div className="coms-create">
                <div className="create-block">
                    <div className="create-icontext">
                        <div className="create-youricon">
                            <BiUserCircle size={55}/>
                        </div>
                        <textarea className="create-text"/>
                    </div>
                    <button className="create-button">Envoyer</button>
                </div>
            </div>
            <div className="coms-all">
                <div className="coms-one">
                    <div className='coms-top'>
                        <p className="coms-username"><GiTalk size={20}/>{username}</p>
                    </div>
                    <div className="coms-bot">
                        <div className="coms-usericon">
                            <BiUserCircle size={55}/>
                        </div>
                        <div className="coms-text">
                            <p className="coms-content">Texte de l'utilisateur</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comments