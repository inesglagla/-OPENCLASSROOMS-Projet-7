import Axios from "axios";
import '../styles/fonts.css';
import '../styles/allpost.css';
import { AiFillLike } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import Comments from './Comments.jsx';

function AllPost() {
    return (
        <div className='g-showpost'>
            <div className='g-usericon'>
                <BiUserCircle size={55}/>
            </div>
            <div className="g-picture"/>
            <div className="gp-text">
                <p>Bonjour, je suis une zone de texte test le temps que la valeur adéquate soit crée. Sinon, ça va? Au moins, le min-height a été testé!</p>
            </div>
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
    )
}

export default AllPost