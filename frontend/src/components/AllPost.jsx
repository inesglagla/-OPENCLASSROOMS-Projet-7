import axios from "axios";
import moment from 'moment';
import 'moment/locale/fr';
import { useState, useEffect, Fragment } from "react";
import Comments from './Comments.jsx';
import AuthBar from './AuthBar.jsx';
import AvatarId from "./AvatarId.jsx";
import '../styles/fonts.css';
import '../styles/allpost.css';
import { AiFillLike } from 'react-icons/ai';

function AllPost({userPic}) {
    const token = JSON.parse(localStorage.getItem("token"));
    const [content, setContent] = useState([]);
    
    //Afficher tous les posts
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        const fetchDataContent = async () => {
            const res = await axios.get (`http://localhost:3000/api/posts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setContent(res.data);
            };
        fetchDataContent();
    }, [])

    //Fonction pour liker un post
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
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        });
    };

    moment.locale('fr')
    const date = moment().fromNow();
    /*
    const jsonObj = {
        momentObj: date
    };
    console.log(JSON.stringify(jsonObj));
    */


    const isThereImage = Boolean;
    /*
    const checkPic = async () => {
        if (imageUrl !== undefined) {
            return isThereImage = true;
        } else {
            return isThereImage = false;
        }  
    }
    */

    return (
        content.map(post => (
        <Fragment key= {post._id}>
            <div className="g-showpost">
                <div className="g-top-bar">
                    <AuthBar postId={post._id}/>
                </div>
                <div className={`g-picture ${isThereImage? 'undefined' : 'true'}`}>
                    <img className="postpic" src={post.imageUrl} alt= "photography"/>
                </div>
                <div className="g-contentuser">
                    <div className='g-usericon'>
                        <AvatarId postId={post._id}/>
                    </div>
                    <div className="gp-text">
                        <p>{post.content}</p>
                    </div>
                </div>
                <p className="g-date">{date}</p>
                <div className="g-bot-bar">
                    <p className="p-comment">Commentaires</p>
                    <div className="g-likes">
                        <div className="like-icon">
                            <AiFillLike size={20}/>
                        </div>
                        <div className="like-number"/>
                            <p onClick={(e) => likePost(post._id, e)}>{post.likes}</p>
                    </div>
                </div>
                <div className="g-comments">
                    <Comments postId={post._id} userPic={userPic}/>
                </div>
            </div>
        </Fragment>
        ))
    )   
}

export default AllPost