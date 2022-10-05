import axios from "axios";
import { useState, useEffect } from "react";
import { BiUserCircle } from 'react-icons/bi';

function AvatarId({postId}) {
    const [userAvatar, setUserAvatar] = useState([]);
    const [showAvatar, setShowAvatar] = useState('');
    const [userId, setUserId] = useState([]);

    //Récupérer le userId du post
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        const fetchAvatar = async () => {
            const res = await axios.get (`http://localhost:3000/api/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setUserId(res.data.userId);
            const resPic = await axios.get (`http://localhost:3000/api/auth/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setUserAvatar(resPic.data.picture);
        };
        fetchAvatar();
    }, [postId, userId])

    //Faire apparaître l'image
    useEffect(() => {
        const verifyPic = async () => {
            if (userAvatar === null) {
                setShowAvatar(<BiUserCircle size={55}/>);
            } else {
                setShowAvatar(<img src={userAvatar} alt='avatar' className='profile-avatar'/>);
            }
        };
        verifyPic();
    }, [userAvatar])

    return (
        <div>{showAvatar}</div>
    )
}

export default AvatarId