import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import '../../styles/loginsign.css';

function Login () {

  const url= 'http://localhost:3000/api/auth/login';
  const [data, setData] = useState({
    username:'',
    email:'',
    password:'',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handle(e) {
    const newdata={...data};
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  function submit(e) {
    e.preventDefault();
    Axios.post(url, {
      username: data.username,
      email: data.email,
      password: data.password,
    })
    .then(res => {
      localStorage.setItem("token", res.data);
      navigate('/home');
      console.log(res.data);
    })
    .catch((error)=> {
			if ( error.response && error.response.status >= 400 && error.response.status <= 500) {
				setError(error.response.data.message);
			}
    });
  }

  return (
      <div>
        <Navbar />
        <div className="container">
          <form onSubmit={(e) => submit(e)}>
            <div className="form-group">
              <h2>Se connecter</h2>
              <div className="form-field">
                <label>Nom d'utilisateur</label>
                <input onChange={(e) => handle(e)} type="text" id="username" name="username" value={data.username}/>
              </div>
              <div className="form-field">
                <label>Email</label>
                <input onChange={(e) => handle(e)} type="email" id="email" name="email" value={data.email}/>
              </div>
              <div className="form-field">
                <label>Mot de passe</label>
                <input onChange={(e) => handle(e)} type="password" id="password" name="password" value={data.password}/>
              </div>
              {error && <div className="error_msg">{error}</div>}
              <button className="form-button">Envoyer</button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default Login