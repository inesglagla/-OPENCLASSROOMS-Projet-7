import Navbar from "../../components/Navbar";
import '../../styles/loginsign.css';

function Login () {
    return (
        <div>
          <Navbar />
          <div className="container">
            <form>
              <div className="form-group">
                <h2>Se connecter</h2>
                <div className="form-field">
                  <label>Nom d'utilisateur</label>
                  <input type="text" id="username" name="username"/>
                </div>
                <div className="form-field">
                  <label>Email</label>
                  <input type="email" id="email" name="email"/>
                </div>
                <div className="form-field">
                  <label>Mot de passe</label>
                  <input type="password" id="password" name="password"/>
                </div>
                <button className="form-button">Envoyer</button>
              </div>
            </form>
          </div>
        </div>
    )
}

export default Login