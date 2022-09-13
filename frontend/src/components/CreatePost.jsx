import { useState } from "react";
import Axios from "axios";
import '../styles/fonts.css';
import '../styles/createpost.css';
import { BiUserCircle } from 'react-icons/bi';
import { BsFillImageFill } from 'react-icons/bs';
import { MdOndemandVideo } from 'react-icons/md';

function CreatePost() {
  //Variables
  const url = `http://localhost:3000/api/posts`;
  const [error, setError] = useState('');
  const token = JSON.parse(localStorage.getItem("token"));

  //Fonction pour l'image
  const [file, setFile] = useState();
  function handlePic(e) {
    setFile(e.target.files[0]);
  }

  //Fonction pour le contenu
  const [content, setContent] = useState('');
  function handleContent(e) {
    setContent(e.target.value);
  }

  //Fonction pour envoyer le post
  function addPost(e) {
    e.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    bodyFormData.append("post", content);
    Axios.post(url, bodyFormData, {
      headers: {
        Authorization: `Bearer ${token}`,
    }})
    .then((res) => {
      console.log(res.data);
      window.location.reload();
    })
    .catch((error)=> {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    });
  };

    return (
        <div className='g-yourpost'>
          <div className='g-icontext'>
            <div className='g-youricon'>
              <BiUserCircle size={55}/>
            </div>
            <textarea onChange={(e) => handleContent(e)} className='post-text' type="text" id="text" name="text" value={content}/>
          </div>
          <div className='post-addnav'>
            <div className='post-image'>
              <div className='post-imageicon'>
                <BsFillImageFill size={20}/>
              </div>
              <label htmlFor="file">Ajouter une photo</label>
              <input className='inputimage' onChange={(e) => handlePic(e)} type="file" id="file" name="file" accept=".jpg,.jpeg,.png"/>
            </div>
            <div className='post-video'>
              <div className='post-videoicon'>
                <MdOndemandVideo size={20}/>
              </div>
              <p>Ajouter une vidéo</p>
            </div>
          </div>
          {error && <div className="error_post">{error}</div>}
          <button className="post-button" type="submit" onClick={(e) => addPost(e)}>Poster</button>
      </div>
    )
  }

export default CreatePost