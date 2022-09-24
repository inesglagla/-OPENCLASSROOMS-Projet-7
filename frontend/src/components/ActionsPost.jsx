import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/fonts.css';
import '../styles/allpost.css';
import '../styles/createpost.css';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RiPencilLine } from 'react-icons/ri';
import { MdOutlineFormatAlignRight } from 'react-icons/md';

function ActionsPost() {
    //Partie SUPPRESSION
    const [error, setError] = useState('');
    const [content, setContent] = useState([]);
    const [open, setOpen] = useState([Boolean]);
    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        const fetchDataContent = async () => {
            const res = await axios.get (`http://localhost:3000/api/posts/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setContent(res.data);
            console.log(res.data);
            };
            fetchDataContent();
        }, [])

    //Fonction pour supprimer un post
    function deletePost (id, e) {
        e.preventDefault();
        axios.delete(`http://localhost:3000/api/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((error)=> {
            setError(error);
        });
    };

    //Partie MODIFICATION
    const navigate = useNavigate();
    function goModify(id) {
        navigate(`/home/${id}`);
    };

    return (
            <div className="g-nav-md" onClick= {()=> setOpen(!open)}>
            <div className="g-align">
                <MdOutlineFormatAlignRight size={30}/>
            </div>
            <div className={`g-dm-icons ${open? 'inactive' : 'active'}`}>
                {content.map(navbar => (
                    <Fragment key= {navbar._id}>
                        <div className="g-delete" onClick={(e) => deletePost(navbar._id, e)}>
                            <RiDeleteBin6Line size={25}/>
                            <p>Supprimer</p>
                        </div>
                        <div className="g-modify" onClick={() => goModify(navbar._id)}>
                            <RiPencilLine size={25}/>
                            <p>Modifier</p>
                        </div>
                    </Fragment>
                ))}
            </div>
            {error && <div className="error_post">{error}</div>}
        </div>
    )
}

export default ActionsPost