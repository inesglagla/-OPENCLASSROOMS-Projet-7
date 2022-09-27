import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import Comments from './Comments.jsx';
import ActionsPost from './ActionsPost.jsx';
import '../styles/fonts.css';
import '../styles/allpost.css';
import { AiFillLike } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';

function AllPost() {
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
            console.table(res.data);
            };
            fetchDataContent();
        }, [])

    //Fonction pour liker un post
    function likePost(id, e) {
        e.preventDefault();
        const userId = JSON.parse(localStorage.getItem("userId"));
        let dataLike = {
            userId: userId,
            like: 1
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

    //Faire apparaître le composant pour modifier/supprimer un post qui appartient à l'utilisateur
    let userIdPost = content.userId;
    console.log(userIdPost);

    let navUser = undefined;
    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem("userId"));
        let userValid = Boolean;
        if (userIdPost === userId) {
            let userValid = true;
        } else {
            let userValid = false;
        }
        if (userValid) {
            let navUser = <ActionsPost />;
        }
    })

    return (
        content.map(post => (
        <Fragment key= {post._id}>
            <div className="g-showpost">
                <div className="g-top-bar">
                    <ActionsPost postId={post._id}/>
                </div>
                <div className="g-picture">
                    <img className="postpic" src={post.imageUrl} alt= "photography"/>
                </div>
                <div className="g-contentuser">
                    <div className='g-usericon'>
                        <BiUserCircle size={55}/>
                    </div>
                    <div className="gp-text">
                        <p>{post.content}</p>
                    </div>
                </div>
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
                    <Comments />
                </div>
            </div>
        </Fragment>
        ))
    )   
}

export default AllPost