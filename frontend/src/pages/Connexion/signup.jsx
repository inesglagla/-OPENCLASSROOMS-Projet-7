import Axios from "axios";
import moment from "moment";
import 'moment/locale/fr';
import PhoneInput from 'react-phone-number-input/input';
import DatePicker from "react-datepicker";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/loginsign.css';

function Signup () {
  //Variables
  const url = 'http://localhost:3000/api/auth/signup';
  const [data, setData] = useState({
    username:'',
    email:'',
    password:'',
    picture: null,
    isAdmin: false,
    birthday: '',
    adress: '',
    phone: '',
    job: '',
  });
  moment.locale('fr');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [number, setNumber] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const birthdayDate = startDate.toLocaleString();

  //S'inscrire
  function submit(e) {
    e.preventDefault();
    Axios.post(url, {
      username: data.username,
      email: data.email,
      password: data.password,
      picture: null,
      isAdmin: false,
      birthday: birthdayDate,
      adress: data.adress,
      phone: number,
      job: data.job,
    })
    .then(res => {
      navigate('/login');
    })
    .catch((error)=> {
			if ( error.response && error.response.status >= 400 && error.response.status <= 500) {
				setError(error.response.data.message);
			}
    });
  }

  //Récupérer les données
  function handle(e) {
    const newdata = {...data};
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }
  
  return (
        <div>
          <Navbar />
          <div className="container-signup">
            <form onSubmit={(e) => submit(e)}>
              <div className="form-group">
                <h2>S'inscrire</h2>
                <div className="form-field">
                  <label>Nom d'utilisateur</label>
                  <input onChange={(e) => handle(e)} type="text" id="username" name="username" value={data.username}/>
                </div>
                <div className="form-field">
                  <label>Email</label>
                  <input onChange={(e) => handle(e)}  type="email" id="email" name="email" value={data.email}/>
                </div>
                <div className="form-field">
                  <label>Mot de passe</label>
                  <input onChange={(e) => handle(e)}  type="password" id="password" name="password" value={data.password}/>
                </div>
                <div className="form-field">
                  <label>Date de naissance</label>
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <div className="form-field">
                  <label>Adresse</label>
                  <input type="text" onChange={(e) => handle(e)} id="adress" name="adress" value={data.adress}/>
                </div>
                <div className="form-field">
                  <label>Numéro de téléphone</label>
                  <PhoneInput defaultCountry="FR" onChange={setNumber} value={number}/>
                </div>
                <div className="form-field">
                  <label>Fonction dans l'entreprise</label>
                  <input type="text" onChange={(e) => handle(e)} id="job" name="job" value={data.job}/>
                </div>
                {error && <div className="error_msg">{error}</div>}
                <button className="form-button" type="submit">Envoyer</button>
              </div>
            </form>
          </div>
        </div>
    )
};

export default Signup