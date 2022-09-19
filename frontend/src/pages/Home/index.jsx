import NavbarHome from "../../components/NavbarHome";
import CreatePost from "../../components/CreatePost";
import AllPost from "../../components/AllPost";
import Footer from "../../components/Footer";
import '../../styles/fonts.css';
import '../../styles/home.css';
import logo from '../../assets/logo-g.png';

function Home() {
    return (
      <div>
        <NavbarHome />
          <div className='g-fullcontainer'>
            <img src={logo} alt='Groupomania' className='g-logohome' />
            <CreatePost />
            <div className='g-allposts'>
            <AllPost />
            </div>
          </div>
        <Footer />
      </div>
    )
  }

export default Home