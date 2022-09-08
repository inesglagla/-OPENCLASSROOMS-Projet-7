import { Navigate } from 'react-router-dom'
import { UserServices } from './UserServices.jsx';

const AuthRoute = ({children}) => {
    if (!UserServices.isLogged()) {
        return <Navigate to="/login"/>
    }
    return children
};

export default AuthRoute