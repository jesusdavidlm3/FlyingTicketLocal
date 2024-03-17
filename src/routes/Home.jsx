import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import planeImage from '../img/planeGif.webp'
import Atropos from "atropos/react"

const Home = () => {

    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/login')
    }

    const handleRegister = () => {
        navigate('/register')
    }

    return(
        <div className="Home">
            <Atropos shadow={false}><img className='PlaneGif' src={planeImage} /></Atropos>

            <h1>Bienvenido a Flying Ticket</h1>
            <h2>su aliado en la compra de su vuelo</h2>

            <h3>Por favor escoja una opcion</h3>            
            <div className='Buttons'>
                <Button variant="contained" onClick={handleLogin}>Iniciar sesion</Button>
                <Button variant="contained" onClick={handleRegister}>Registrarse</Button>
            </div>
        </div>
    )
}

export default Home