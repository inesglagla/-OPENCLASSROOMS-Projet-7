import React from 'react';
import { useState } from "react";
import Axios from "axios";
import '../styles/fonts.css';
import '../styles/createpost.css';
import { BiUserCircle } from 'react-icons/bi';
import { BsFillImageFill } from 'react-icons/bs';
import { MdOndemandVideo } from 'react-icons/md';

function CreatePost() {
  //Variables
  const url = 'http://localhost:3000/api/posts';
  const [file, setFile] = useState();
  const [error, setError] = useState('');
  const userId = JSON.parse(localStorage.getItem("userId"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [data, setData] = useState({
    userId: userId,
    post: '',
    imageUrl: [],
  });
  
  //Fonction pour l'image
  function handlePic(e) {
    setFile(e.target.files[0]);
  }
  const bodyFormData = new FormData();
  bodyFormData.append("image", file);
  bodyFormData.append("text", data.post);
  bodyFormData.append("userId", userId);

  function handle(e) {
    const newdata = {...data};
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  //Fonction pour envoyer le post
  function addPost(e) {
    e.preventDefault();
    Axios.post(url, 
      {
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
    }})
    .then((res) => {
      console.log("C'est fonctionnel!");
      console.log(res.data);
    })
    .catch((error)=> {
      if ( error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
        console.log(file);
        console.log(data.post);
      }
    });
  };

    return (
        <div className='g-yourpost'>
          <div className='g-icontext'>
            <div className='g-youricon'>
              <BiUserCircle size={55}/>
            </div>
            <textarea onChange={(e) => handle(e)} className='post-text' type="text" id="post" name="post" value={data.post}/>
          </div>
          <div className='post-addnav'>
            <div className='post-image'>
              <div className='post-imageicon'>
                <BsFillImageFill size={20}/>
              </div>
              <p>Ajouter une photo</p>
              <input onChange={(e) => handlePic(e)} type="file" id="file" name="file" accept=".jpg,.jpeg,.png"/>
            </div>
            <div className='post-video'>
              <div className='post-videoicon'>
                <MdOndemandVideo size={20}/>
              </div>
              <p>Ajouter une vidéo</p>
            </div>
          </div>
          {error && <div className="error_post">{error}</div>}
          <button className="post-button" type="submit" onClick={addPost}>Poster</button>
      </div>
    )
  }

export default CreatePost