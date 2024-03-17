import { Button } from "@mui/material"
import { useState, useContext } from "react"
import successLogo from '../img/icons/success.png'
import { context } from '../context/context'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../firebase'

export const BuyModal = ({close, infoVuelo}) => {

    const [bought, setBought] = useState(false)
    const [idCompra, setIdComra] = useState('')
    const { userInfo } = useContext(context)

    async function handleBuy(){
        const docref = await addDoc(collection(db, "tickets"),{
            comprador: userInfo.userId,
            vuelo: infoVuelo.id
        })
        if(docref != null){
            setBought(true)
            setIdComra(docref.id)
        }


    }

    return(
        <div className="BuyModalContainer">
            <div className='BuyModal'>
                { bought ? (
                    <>
                        <h3>Compra realizada con exito</h3>
                        <p>el ID de su ticket es</p>
                        <p>{idCompra}</p>
                        <img src={successLogo}/>
                        <Button onClick={close} variant="contained" >Cerrar</Button>
                    </>
                ):(
                    <>
                        <h1>Confirmacion</h1>
                        <h4>Estas seguro de que deseas comprar un ticket para este Vuelo?</h4>
                        <p>Destino: {infoVuelo.data.destino}</p>
                        <p>Origen: {infoVuelo.data.origen}</p>
                        <p>Aerolinea: {infoVuelo.data.aerolinea}</p>
                        <p>Fecha: {infoVuelo.data.fecha}</p>
                        <p>Duracion: {infoVuelo.data.duracion}</p>
                        <p>Precio: {infoVuelo.data.precio}</p>
                        <p>ID: {infoVuelo.id}</p>
                        <div className="Buttons">
                            <Button onClick={close} variant='contained' color="error">Cancelar</Button>
                            <Button onClick={ () => handleBuy() } variant='contained' color="success">Confirmar</Button>
                        </div>
                    </>
                ) }
            </div>
        </div>
    )
}