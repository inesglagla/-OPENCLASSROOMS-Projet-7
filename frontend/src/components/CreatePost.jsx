import '../styles/fonts.css';
import '../styles/createpost.css';
import { BiUserCircle } from 'react-icons/bi';
import { BsFillImageFill } from 'react-icons/bs';
import { MdOndemandVideo } from 'react-icons/md';

function CreatePost() {
    return (
        <div className='g-yourpost'>
        <div className='g-icontext'>
          <div className='g-youricon'>
            <BiUserCircle size={55}/>
          </div>
          <input className='post-text' type="text" id="text" name="text"></input>
        </div>
        <div className='post-addnav'>
          <div className='post-image'>
            <div className='post-imageicon'>
              <BsFillImageFill size={20}/>
            </div>
            <p>Ajouter une photo</p>
          </div>
          <div className='post-video'>
            <div className='post-videoicon'>
              <MdOndemandVideo size={20}/>
            </div>
            <p>Ajouter une vidéo</p>
          </div>
        </div>
        <button className="post-button">Poster</button>
      </div>
    )
}

export default CreatePost