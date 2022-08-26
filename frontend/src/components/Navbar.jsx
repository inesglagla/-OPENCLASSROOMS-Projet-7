import '../styles/navbar.css';
import logo from '../assets/logo-w.png';
import '../styles/fonts.css';
import { Link } from "react-router-dom";

function Navbar() {
    return (
    <div className='g-banner'>
        <Link to="/">
        <img src={logo} alt='Groupomania' className='g-logo' />
        </Link>
        <div className='g-textbloc'>
          <Link to="/signup">
            <p className='g-text'>S'inscrire</p>
          </Link>
          <Link to="/login">
            <p className='g-text'>Se connecter</p>
          </Link>
        </div>
    </div>
  )
}

export default Navbar