import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";
import '../styles/fonts.css';
import '../styles/modifypost.css';
import '../styles/createpost.css';

function ModifyPost() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    let { id } = useParams();

    //Fonction pour l'image
    const [file, setFile] = useState();
    function handlePic(e) {
        setFile(e.target.files[0]);
    }

    //Fonction pour le contenu
    const [contentText, setContentText] = useState('');
    function handleContent(e) {
        setContentText(e.target.value);
    }

    //Fonction pour modifier un post
    function modifyPost (e) {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem("token"));
        const modifyFormData = new FormData();
        modifyFormData.append("image", file);
        modifyFormData.append("content", contentText);
        axios.put(`http://localhost:3000/api/posts/${id}`, modifyFormData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            console.log(res);
            navigate(`/home`);
        })
        .catch((error)=> {
            setError(error);
        });
    };
    
    return (
        <div>
            <NavbarHome />
            <div className="modify-bloc">
                <div className="modify-bloc-int">
                    <textarea className="modify-text" onChange={(e) => handleContent(e)} type="text" id="text" name="text" value={contentText}/>
                    <div className="modify-actions">
                        <div className="modify-image">
                            <label htmlFor="file">Changer l'image</label>
                            <input className="modify-buttonpic" onChange={(e) => handlePic(e)} type="file" id="file" name="file" accept=".jpg,.jpeg,.png"/>
                        </div>
                        <button className="modify-send" onClick={(e) => modifyPost(e)}>Envoyer</button>
                    </div>
                </div>
                {error && <div className="error_post">{error}</div>}
            </div>
        </div>
    )
}

export default ModifyPost