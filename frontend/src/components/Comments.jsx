import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import '../styles/fonts.css';
import '../styles/comments.css';
import Avatar from "../components/Avatar";
import { BiUserCircle } from 'react-icons/bi';
import { GiTalk } from 'react-icons/gi';

function Comments({postId, userPic}) {
    const [username, setUsername] = useState('');
    const [contentComment, setContentComment] = useState([]);

    //Récupérer le pseudonyme de l'utilisateur
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

    //Récupérer les commentaires
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        const fetchCommentData = async () => {
            const res = await axios.get (`http://localhost:3000/api/posts/${postId}/comments`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setContentComment(res.data);
            };
            fetchCommentData();
        }, [])
    
    //Poster un commentaire
    //Fonction pour le contenu
    const [text, setText] = useState('');
    function handleText(e) {
        setText(e.target.value);
    }

  //Fonction pour envoyer le post
  function addComment(e) {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    let commentText = {
        content: text
    }
    axios.post(`http://localhost:3000/api/posts/${postId}/comments`, commentText, {
      headers: {
        Authorization: `Bearer ${token}`,
    }})
    .then((res) => {
      console.log(res.data);
      window.location.reload();
    })
    .catch((error)=> {
      console.log(error);
    });
  };
        
    return (
        <div className="coms-bloc">
            <div className="coms-create">
                <div className="create-block">
                    <div className="create-icontext">
                        <div className="create-youricon">
                            <Avatar userPic={userPic}/>
                        </div>
                        <textarea className="create-text" onChange={(e) => handleText(e)} type="text" id="text" name="text" value={text}/>
                    </div>
                    <button className="create-button" type="submit" onClick={(e) => addComment(e)}>Envoyer</button>
                </div>
            </div>
            {contentComment.map(com => (
                <Fragment key= {com._id}>
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
                                    <p className="coms-content">{com.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            ))}
        </div>
    )
}

export default Comments