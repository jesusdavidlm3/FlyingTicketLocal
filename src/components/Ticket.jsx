import { Button } from "@mui/material"
import Atropos from "atropos/react"
import { useContext } from "react"
import { context } from "../context/context"


export const Ticket = ({close, infoVuelo}) => {

    const { userInfo } = useContext(context)

    return(
        <div className="ticketContainer">
            <Atropos duration={100}>
                <div className='ticket'>
                    <p>Nombre: {userInfo.name}</p>
                    <p>Identificacion: {userInfo.userId}</p>
                    <p>Vuelo: {infoVuelo.id}</p>
                    <p>Estado: {infoVuelo.data.estado}</p>
                    <p>Destino: {infoVuelo.data.destino}</p>
                    <p>Origen: {infoVuelo.data.origen}</p>
                    <p>Fecha: {infoVuelo.data.fecha}</p>
                    <p>Duracion: {infoVuelo.data.duracion}</p>

                    <Button onClick={close} variant="contained" color="error">Cerrar</Button>
                </div>
            </Atropos>
        </div>
        
    )
}