import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import Comments from './Comments.jsx';
import '../styles/fonts.css';
import '../styles/allpost.css';
import { AiFillLike } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';

function AllPost(props) {
    const url = 'http://localhost:3000/api/posts';
    const [data, setData] = useState([]);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        const fetchData = async () => {
            const res = await axios.get (url, {
                headers: {
                    Authorization: `Bearer ${token}`}
            })
            setData(res.data);
            };
            fetchData();
        }, [])
    
    console.log(data);

    return (
        data.map(item => (
        <Fragment key= {item._id}>
            <div className='g-showpost'>
                <div className='g-usericon'>
                    <BiUserCircle size={55}/>
                </div>
                <div className="g-picture">
                    <img className="postpic" src={item.imageUrl} alt= ""/>
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
                            <p>{item.likes}</p>
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