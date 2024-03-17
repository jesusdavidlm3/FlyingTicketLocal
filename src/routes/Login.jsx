import authLogo from '../img/icons/auth.png'
import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { context } from '../context/context'
import { useContext } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { auth } from '../../firebase'
import { db } from '../../firebase'

const Login = () => {

    const navigate = useNavigate()
    const { setUserInfo } = useContext(context)

    async function handleSubmit(e){
        e.preventDefault()
        const userEmail = e.target[0].value;
        const userPassword =  e.target[2].value;

        signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then(async (userCredential) => {
            const user = userCredential.user;
            if(user != null){
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                setUserInfo(docSnap.data())
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