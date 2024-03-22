import { Button, TextField } from '@mui/material'
import authLogo from '../img/icons/auth.png'
import { useState } from 'react'
import successLogo from '../img/icons/success.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { hash } from '../functions/encrypt'

const Register = () => {

    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()
    const date = new Date()

    async function handleSubmit(e){
        e.preventDefault()
        const data = {
            id: e.target[4].value,
            email: e.target[0].value,
            name: e.target[2].value,
            passwordHash: await hash(e.target[6].value),
            passwordDate: date,
        }
        axios.post('http://localhost:3000/api/registrar', data)
        .then((response) => {
            if(response.status == 200){
                setSuccess(true);
            }
        })
    }

    return(
        <div className='Register'>

            { success ? (
                <>
                    <img className='successLogo' src={successLogo}/>
                    <h1>Registro Exitoso</h1>
                    <h4 onClick={ () => navigate('/home') }>Presione aqui para volver al inicio</h4>
                </>
            ):(
                <>
                    <img className='authLogo' src={authLogo}/>
                    <h1>Registro</h1>
                    <form onSubmit={handleSubmit}>
                        <TextField variant='outlined' label='Correo Electronico' type='email'/>
                        <TextField variant='outlined' label='Nombre'/>
                        <TextField variant='outlined' label='Identificacion' type='number'/>
                        <TextField variant='outlined' label='Contraseña' type='password'/>
                        <Button type='submit' variant='contained'>Registrarse</Button>
                    </form>
                    <p onClick={ () => navigate('/login') }>Iniciar sesion</p>
                    <p onClick={ () => navigate('/home') }>Inicio</p>
                </>
            ) }

            
        </div>
    )
}

export default Register