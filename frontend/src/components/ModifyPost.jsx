import axios from "axios";
import { useState, useEffect } from "react";
import { RiCloseCircleLine } from 'react-icons/ri';

function ModifyPost() {
    //Fonction pour récupérer les données des posts
    const url = 'http://localhost:3000/api/posts';
    const [data, setData] = useState([]);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        const fetchData = async () => {
            const res = await axios.get (url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setData(res.data);
            };
            fetchData();
        }, [])

    //Fonction pour modifier un post

    return (
        <div className="bloc-modify">
        <div className="mb-content">
            <div className="m-annuler">
                <RiCloseCircleLine size={40} />
            </div>
            <div className="m-showcontent">
                <textarea className='m-text' type="text" id="text" name="text"/>
            </div>
            <div className="mb-picture">
                <p className="m-changepicture">Changer ou charger une image?</p>
            </div>
            <button className="m-button">Envoyer</button>
        </div>
   </div>
    )
}

export default ModifyPost

/*
.bloc-modify {
    position: absolute;
    background-color: #4e5166e3;
    width: 600px;
    min-height: 300px;
    border: 2px solid black;
    border-radius: 10px;
}

.m-annuler {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    color: white;
    padding: 10px;
}

.m-text {
    margin-left: 45px;
    margin-right: 45px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 100px;
    border: 1px solid black;
}

.m-changepicture {
    padding: 10px;
    text-align: center;
    color: white;
}

.m-button {
    width: 100px;
    padding: 10px;
    margin:10px;
    color: white;
    background-color: #FD2D01;
	border-radius: 4px;
    font-size: 15px;
}
*/