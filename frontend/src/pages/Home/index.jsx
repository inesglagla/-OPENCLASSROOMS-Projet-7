import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import NavbarHome from "../../components/NavbarHome";
import CreatePost from "../../components/CreatePost";
import AllPost from "../../components/AllPost";
import Footer from "../../components/Footer";
import '../../styles/fonts.css';
import '../../styles/home.css';
import logo from '../../assets/logo-g.png';

function Home() {
  //Récupérer données utilisateurs
  const [userData, setUserData] = useState([]);
  useEffect(() => {
      const userId = JSON.parse(localStorage.getItem('userId'));
      const token = JSON.parse(localStorage.getItem("token"));
      const fetchUserData = async () => {
          const res = await axios.get (`http://localhost:3000/api/auth/users/${userId}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          })
          setUserData(res.data);
      };
      fetchUserData();
  }, [])

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

    return (
      <div>
        <NavbarHome userPic={userData.picture}/>
          <div className='g-fullcontainer'>
            <img src={logo} alt='Groupomania' className='g-logohome' />
            <CreatePost userPic={userData.picture}/>
            <div className='g-allposts'>
            {content.map(post => (
              <Fragment key= {post._id}>
                <AllPost userPic={userData.picture} isAdmin={userData.isAdmin} post={post}/>
              </Fragment>
            ))}
            </div>
          </div>
        <Footer />
      </div>
    )
  }

export default Home