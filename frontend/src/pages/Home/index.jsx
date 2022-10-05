import axios from "axios";
import { useState, useEffect } from "react";
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
  const [admin, setAdmin] = useState('');
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
          setAdmin(res.data.isAdmin);
      };
      fetchUserData();
  }, [])

    return (
      <div>
        <NavbarHome userPic={userData.picture}/>
          <div className='g-fullcontainer'>
            <img src={logo} alt='Groupomania' className='g-logohome' />
            <CreatePost userPic={userData.picture}/>
            <div className='g-allposts'>
            <AllPost userPic={userData.picture}/>
            </div>
          </div>
        <Footer />
      </div>
    )
  }

export default Home