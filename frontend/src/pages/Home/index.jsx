import '../../styles/fonts.css';
import '../../styles/home.css';
import logo from '../../assets/logo-g.png';
import NavbarHome from "../../components/NavbarHome";
import CreatePost from "../../components/CreatePost";

function Home() {
    return (
      <div>
        <NavbarHome />
        <div className='g-fullcontainer'>
          <img src={logo} alt='Groupomania' className='g-logohome' />
          <CreatePost />
          <div className='g-allposts'>
          </div>
        </div>
      </div>
    )
  }

export default Home