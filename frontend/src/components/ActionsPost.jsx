import axios from "axios";
import { useState } from "react";
import AllPost from "../components/AllPost";
import '../styles/fonts.css';
import '../styles/allpost.css';
import '../styles/createpost.css';
import { RiDeleteBin6Line, RiPencilLine } from 'react-icons/ri';
import { MdOutlineFormatAlignRight } from 'react-icons/md';

function ActionsPost({id, modifyValueChild}) {
    //Partie SUPPRESSION
    const [open, setOpen] = useState([Boolean]);
    const token = JSON.parse(localStorage.getItem("token"));

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
            console.log(error);
        });
    };

    //Partie MODIFICATION
    const [stateModify, setStateModify] = useState(Boolean);
    function goModify(id) {
        modifyValueChild(true);
    };

    return (
            <div className="g-nav-md" onClick= {()=> setOpen(!open)}>
            <div className="g-align">
                <MdOutlineFormatAlignRight size={30}/>
            </div>
            <div className={`g-dm-icons ${open? 'inactive' : 'active'}`}>
                <div className="g-delete" onClick={(e) => deletePost(id, e)}>
                    <RiDeleteBin6Line size={25}/>
                    <p>Supprimer</p>
                </div>
                <div className="g-modify" onClick={() => goModify(id)}>
                    <RiPencilLine size={25}/>
                    <p>Modifier</p>
                </div>
            </div>
        </div>
    )
}

export default ActionsPost