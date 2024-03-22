import authLogo from '../img/icons/auth.png'
import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { context } from '../context/context'
import { useContext } from 'react'
import axios from 'axios'
import { hash } from '../functions/encrypt'

const Login = () => {

    const navigate = useNavigate()
    const { setUserInfo } = useContext(context)

    async function handleSubmit(e){
        e.preventDefault()
        const data = {
            email: e.target[0].value,
            passwordHash: await hash(e.target[2].value)
        }

        axios.post('http://localhost:3000/api/iniciarSesion', data)
        .then((response) => {
            if(response.status == 200){
                setUserInfo(response.data)
                navigate('/checking')
            }
        })
    }

    return(
        <div className="Login">
            <img className='authLogo' src={authLogo}/>
            <h1>Iniciar Sesion</h1>
            <form onSubmit={handleSubmit}>
                <TextField variant='outlined'type='email' label='Correo'/>
                <TextField variant='outlined' type='password' label='Contraseña'/>
                <Button type='submit' variant='contained'>Iniciar sesion</Button>
            </form>
            <p onClick={ () => navigate('/register') }>Registrarse</p>
            <p onClick={ () => navigate('/home') }>Inicio</p>
        </div>
    )
}

export default Login