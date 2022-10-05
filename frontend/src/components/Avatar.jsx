import { useState, useEffect } from "react";
import { BiUserCircle } from 'react-icons/bi';

function Avatar({userPic}) {
    //Afficher l'avatar de l'utilisateur
    const [showAvatar, setShowAvatar] = useState('');

    useEffect(() => {
        const verifyPic = async () => {
            if (userPic === null) {
                setShowAvatar(<BiUserCircle size={55}/>);
            } else {
                setShowAvatar(<img src={userPic} alt='avatar' className='profile-avatar'/>);
            }
        };
        verifyPic();
    }, [userPic])

    return (
        <div>
            {showAvatar}
        </div>
    )
}

export default Avatar