import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import Comments from './Comments.jsx';
import '../styles/fonts.css';
import '../styles/allpost.css';
import { AiFillLike } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RiPencilLine } from 'react-icons/ri';

function AllPost() {
    //Fonction pour afficher l'entièreté des posts
    const url = 'http://localhost:3000/api/posts';
    const token = JSON.parse(localStorage.getItem("token"));
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

    //Fonction pour supprimer un post
    function deletePost (id, e) {
        e.preventDefault();
        axios.delete(`http://localhost:3000/api/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((error)=> {
          console.log(error);
        });
    };

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

    return (
        data.map(item => (
        <Fragment key= {item._id}>
            <div className='g-showpost'>
                <div className="g-top-bar">
                    <div className="g-delete" onClick={(e) => deletePost(item._id, e)}>
                        <RiDeleteBin6Line size={30}/>
                    </div>
                    <div className="g-modify">
                        <RiPencilLine size={30}/>
                    </div>
                </div>
                <div className='g-usericon'>
                    <BiUserCircle size={55}/>
                    <p>Username</p>
                </div>
                <div className="g-picture">
                    <img className="postpic" src={item.imageUrl} alt= "photography"/>
                </div>
                    <div className="gp-text">
                        <p>{item.post}</p>
                    </div>
                <div className="g-bot-bar">
                    <p className="p-comment">Commentaires</p>
                    <div className="g-likes">
                        <div className="like-icon">
                            <AiFillLike size={20}/>
                        </div>
                        <div className="like-number"/>
                            <p onClick={(e) => likePost(item._id, e)}>{item.likes}</p>
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