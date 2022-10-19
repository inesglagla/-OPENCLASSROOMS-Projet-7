import React from "react";
import axios from "axios";
import { useState } from "react";
import '../styles/fonts.css';
import '../styles/modifypost.css';

function ModifyPost({id, postInfos}) {
    const [error, setError] = useState('');
    const [isFileDefinedM, setIsFileDefinedM] = useState();

    //Fonction pour l'image
    const [fileModify, setFileModify] = useState();
    function handlePicM(e) {
        setFileModify(e.target.files[0]);
        setIsFileDefinedM(true);
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
        let contentDefault = postInfos.content;
        let fileDefault = postInfos.imageUrl;
        const modifyFormData = new FormData();
        if (contentText === '') {
            modifyFormData.append("content", contentDefault);
        } else {
            modifyFormData.append("content", contentText);
        }
        if (fileModify === '') {
            modifyFormData.append("image", fileDefault);
        } else {
            modifyFormData.append("image", fileModify);
        }
        axios.put(`http://localhost:3000/api/posts/${id}`, modifyFormData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            console.log(res);
            window.location.reload();
        })
        .catch((error)=> {
            setError(error);
        });
    };

    return (
        <div>
            <div className="modify-image">
                <label htmlFor="fileM">Changer l'image</label>
                {isFileDefinedM
                ? <p className="modify-p">(image chargée)</p>
                : <input className="modify-buttonpic" onChange={(e) => handlePicM(e)} type="file" id="fileM" name="fileM" accept=".jpg,.jpeg,.png"/>}
            </div>
            <textarea className="textarea-modify" onChange={(e) => handleContent(e)} type="text" id="text" name="text" defaultValue={postInfos.content}/>
            <button className="modify-send" onClick={(e) => modifyPost(e)}>Modifier</button>
            {error && <div className="error_post">{error}</div>}
        </div>
    )
}

export default ModifyPost