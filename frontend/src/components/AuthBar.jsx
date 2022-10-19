import axios from "axios";
import { useState, useEffect } from "react";
import ActionsPost from './ActionsPost.jsx';

function AuthBar({postId, isAdmin, modifyValue}) {
    //Récupérer le userId du post
    const [userIdPost, setUserIdPost] = useState([]);
    const [proprio, setProprio] = useState('');
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        const fetchAuthBar = async () => {
            const res = await axios.get (`http://localhost:3000/api/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setUserIdPost(res.data.userId);
            //Faire apparaître le composant pour modifier/supprimer un post qui appartient à l'utilisateur
            const userId = JSON.parse(localStorage.getItem("userId"));
            if (userId === userIdPost || isAdmin === true) {
                setProprio(<ActionsPost id={postId} modifyValueChild={modifyValue}/>);
            } else {
                setProprio('');
            }
        }
        fetchAuthBar();
    }, [postId, userIdPost, isAdmin, modifyValue])
    
    return (
        <div>{proprio}</div>
    )
}

export default AuthBar