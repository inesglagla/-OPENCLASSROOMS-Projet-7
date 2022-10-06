import axios from "axios";
import moment from 'moment';
import 'moment/locale/fr';
import { useState, useEffect} from "react";
import Comments from './Comments.jsx';
import AuthBar from './AuthBar.jsx';
import AvatarId from "./AvatarId.jsx";
import '../styles/fonts.css';
import '../styles/allpost.css';
import { AiFillLike } from 'react-icons/ai';

function AllPost({userPic, isAdmin, post}) {
    moment.locale('fr')
    const token = JSON.parse(localStorage.getItem("token"));

    //Fonction pour liker un post
    const [likeCounter, setLikeCounter] = useState(post.likes);
    function likePost(id, e) {
        e.preventDefault();
        const userId = JSON.parse(localStorage.getItem("userId"));
        let dataLike = {
            userId: userId,
            likes: 1
        };
        axios.post(`http://localhost:3000/api/posts/${id}/like`, dataLike, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            console.log(res);
            if (likeCounter === 1) {
                setLikeCounter(likeCounter - 1);
            } else {
                setLikeCounter(likeCounter + 1);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    //Affichage d'une image ou d'un texte ou les deux
    const [openImage, setOpenImage] = useState([Boolean]);
    const [openText, setOpenText] = useState([Boolean]);
    const postImage = post.imageUrl;
    const postText = post.content;
    useEffect(() => {
        const checkPic = async () => {
            if (postImage !== undefined) {
                setOpenImage(true);
            } else {
                setOpenImage(false);
            }  
        };
        const checkText = async () => {
            if (postText !== undefined) {
                setOpenText(true);
            } else {
                setOpenText(false);
            }  
        };
        checkPic();
        checkText();
    }, [postImage, postText])

    return (
            <div className="g-showpost">
                <div className="g-top-bar">
                    <AuthBar postId={post._id} isAdmin={isAdmin}/>
                </div>
                <div className="g-picture">
                    {openImage
                    ? <img className="postpic" src={post.imageUrl} alt="photography"/> 
                    : ''}
                </div>
                <div className="g-contentuser">
                    <div className='g-usericon'>
                        <AvatarId postId={post._id}/>
                    </div>
                    {openText
                    ? <div className="gp-text">
                        <p>{post.content}</p>
                    </div>
                    : ''}
                </div>
                <p className="g-date">{moment(post.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
                <div className="g-bot-bar">
                    <p className="p-comment">Commentaires</p>
                    <div className="g-likes">
                        <div className="like-icon">
                            <AiFillLike size={20}/>
                        </div>
                        <div className="like-number"/>
                            <p onClick={(e) => likePost(post._id, e)}>{likeCounter}</p>
                    </div>
                </div>
                <div className="g-comments">
                    <Comments postId={post._id} userPic={userPic}/>
                </div>
            </div>
    )   
}

export default AllPost