import Axios from "axios";
import { useState, useEffect, Fragment } from "react";
import Comments from './Comments.jsx';
import '../styles/fonts.css';
import '../styles/allpost.css';
import { AiFillLike } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';

function AllPost() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await Axios ('http://localhost:3000/api/posts');
            setData(result.data);
            console.log("updated");
            };
            fetchData();
            console.log("mounted");
        }, [])
    console.log(data);

    return (
        <Fragment>
            <div className='g-showpost'>
                <div className='g-usericon'>
                    <BiUserCircle size={55}/>
                </div>
                <div className="g-picture">
                    <img className="postpic" src= 'hop' alt= ""/>
                </div>
                {data.map(item => (
                    <div className="gp-text" key={item.id}>
                        <p>{item.post}</p>
                    </div>
                ))}
                <div className="g-bot-bar">
                    <p className="p-comment">Commentaires</p>
                    <div className="g-likes">
                        <div className="like-icon">
                            <AiFillLike size={20}/>
                        </div>
                        <div className="like-number"/>
                            <p>0</p>
                    </div>
                </div>
                <div className="g-comments">
                    <Comments />
                </div>
            </div>
        </Fragment>
    )
}

export default AllPost