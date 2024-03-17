import { useNavigate } from 'react-router-dom'
import errorIcon from '../img/icons/error.png'

const ErrorPage = () => {
    
    const navigate = useNavigate()
    
    return(
        <div className="ErrorPage">
            <img src={errorIcon}/>
            <h1>Error</h1>
            <h2 onClick={ () => navigate('/home') }>Presiona aqui para volver</h2>
        </div>
    )
}

export default ErrorPage