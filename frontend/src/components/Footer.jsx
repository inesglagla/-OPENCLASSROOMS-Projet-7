import '../styles/fonts.css';
import '../styles/footer.css';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';

function Footer() {
    return (
        <div className='footer'>
            <div className='footer-contact-bloc'>
                <div className='footer-contact'>
                    <h2>Un problème avec le site? Contactez le support technique.</h2>
                    <div className='footer-admin'>
                        <h3><MdOutlineAdminPanelSettings size={23}/>Groupomania-Admin</h3>
                        <p>Adresse e-mail : admin@email.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer