import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import '../styles/fonts.css';
import '../styles/comments.css';
import Avatar from "../components/Avatar";
import ShowComment from "../components/ShowComment";

function Comments({postId, userPic}) {
    const [commentData, setCommentData] = useState([]);

    //Récupérer les commentaires
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        const fetchCommentData = async () => {
            const res = await axios.get (`http://localhost:3000/api/posts/${postId}/comments`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setCommentData(res.data);
            };
            fetchCommentData();
        }, [postId])
    
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
            {commentData.map(com => (
                <Fragment key= {com._id}>
                    <div className="coms-all">
                        <ShowComment userId={com.userId} commentContent={com.content} commentDate={com.dateComment}/>
                    </div>
                </Fragment>
            ))}
        </div>
    )
}

export default Comments