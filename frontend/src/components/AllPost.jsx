import axios from "axios";
import moment from 'moment';
import 'moment/locale/fr';
import { useState, useEffect} from "react";
import Comments from './Comments.jsx';
import AuthBar from './AuthBar.jsx';
import AvatarId from "./AvatarId.jsx";
import ModifyPost from "../components/ModifyPost";
import '../styles/fonts.css';
import '../styles/allpost.css';
import { AiFillLike } from 'react-icons/ai';

function AllPost({userPic, isAdmin, post, id}) {
    const token = JSON.parse(localStorage.getItem("token"));
    //Fonction pour liker un post
    const [likeCounter, setLikeCounter] = useState(post.likes);
    const [alreadyLiked, setAlreadyLiked] = useState(Boolean);
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
            if (alreadyLiked === true || post.usersLiked === userId) {
                setLikeCounter(likeCounter - 1);
                setAlreadyLiked(false);
            } else {
                setLikeCounter(likeCounter + 1);
                setAlreadyLiked(true);
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
            if (postImage !== '') {
                setOpenImage(true);
            } else {
                setOpenImage(false);
            }  
        };
        const checkText = async () => {
            if (postText !== '') {
                setOpenText(true);
            } else {
                setOpenText(false);
            }  
        };
        checkPic();
        checkText();
    }, [postImage, postText])

    //Date des publications
    moment.locale('fr');
    const datePost = post.date;
    const dateShow = moment(datePost, 'DD.MM.YYYY, h:mm:ss a').format('LLLL');

    //Partie modification
    const [modifyDefined, setModifyDefined] = useState(Boolean);
    const [modifyShow, setModifyShow] = useState(Boolean);
    useEffect(() => {
        console.log(modifyDefined);
        if (modifyDefined === true) {
            setModifyShow(true);
        } else {
            setModifyShow(false);
        };
    }, [modifyDefined, modifyShow])

    return (
            <div className="g-showpost">
                <div className="g-top-bar">
                    <AuthBar postId={post._id} isAdmin={isAdmin} modifyValue={setModifyDefined}/>
                </div>
                {openImage
                ? <div className="g-picture">
                    {modifyShow
                    ? <ModifyPost id={post._id} postInfos={post}/>
                    : <img className="postpic" src={post.imageUrl} alt="photography"/>}
                </div>
                : ''}
                <div className="g-contentuser">
                    <div className='g-usericon'>
                        <AvatarId postId={post._id}/>
                    </div>
                    {openText
                    ? <div className="gp-text">
                        {modifyShow
                        ? <ModifyPost id={post._id} postInfos={post}/>
                        : <textarea className="textarea-show" readOnly defaultValue={post.content}/>}
                    </div>
                    : ''}
                </div>
                <p className="g-date">Publié {moment(dateShow).fromNow()}.</p>
                <div className="g-bot-bar">
                    <p className="p-comment">Commentaires</p>
                    <div className="g-likes" onClick={(e) => likePost(post._id, e)}>
                        <div className="like-icon">
                            <AiFillLike size={20}/>
                        </div>
                        <div className="like-number"/>
                            <p>{likeCounter}</p>
                    </div>
                </div>
                <div className="g-comments">
                    <Comments postId={post._id} userPic={userPic}/>
                </div>
            </div>
    )   
}

export default AllPost