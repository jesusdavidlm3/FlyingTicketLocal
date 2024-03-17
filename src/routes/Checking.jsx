import { Button } from '@mui/material'
import { Ticket } from '../components/Ticket'
import { useState } from 'react'
import { useContext } from 'react'
import { context } from '../context/context'
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import { useEffect } from 'react'
import { BuyModal } from '../components/BuyModal'

const Checking = () => {

    const { userInfo } = useContext(context)
    const [openTicket, setOpenTicket] = useState(false)
    const [buyTicket, setBuyTicket] = useState(false)
    const [showBuy, setShowBuy] = useState(false)
    const [showCheck, setShowCheck] = useState(false)
    const [showTickets, setShowTickets] = useState([])
    const [showTickets2, setShowTickets2] = useState([])
    let tickets = []
    let ticketToGetInfo = []
    const [ticketId, setTicketId] = useState([])
    const [infoVuelo, setInfoVuelo] = useState('')


    async function wannaCheck(){
        setShowBuy(false)
        setShowCheck(true)

        const q = query(collection(db, "tickets"), where("comprador", "==", userInfo.userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            ticketToGetInfo = [...ticketToGetInfo, doc.data()]
            setTicketId([...ticketId, doc.id()])
        });
        ticketToGetInfo.map( async (ticketInfo) => {
            const docRef = doc(db, "vuelos", ticketInfo.vuelo);
            const docSnap = await getDoc(docRef);
            tickets = [...tickets, {data: docSnap.data(), id: docSnap.id}]
            setShowTickets2(tickets)
        } )
    }

    async function wannaBuy(){
        setShowBuy(true)
        setShowCheck(false)

        const querySnapshot = await getDocs(collection(db, 'vuelos'));
        querySnapshot.forEach((doc) => {
        tickets = [...tickets, {data: doc.data(), id: doc.id}]
        });
        setShowTickets(tickets);
    }
        

    async function openCloseTicket(ticketInfo){
        setOpenTicket(!openTicket)
        setInfoVuelo(ticketInfo)
    }

    async function openCloseBuy(ticketInfo){
        setBuyTicket(!buyTicket)
        setInfoVuelo(ticketInfo)
    }

    return(
        <div className="Checking">
            <h1>Bienvenido: {userInfo.name}</h1>
            <div className='buttons'>
                <Button variant='contained' onClick={wannaCheck} >ver tickets</Button>
                <Button variant='contained' onClick={wannaBuy}>comprar</Button>
            </div>

            { showBuy && <div className='listContainer'>
                { showTickets.map( (ticketsToBuy) => (
                    <div key={ticketsToBuy.data.destino} className='OneTicket'>
                        <div className='info'>
                            <p>Destino: {ticketsToBuy.data.destino}</p>
                            <p>{ticketsToBuy.data.fecha}</p>
                            <p>Duracion: {ticketsToBuy.data.duracion}</p>
                        </div>

                        <Button variant='contained' onClick={ () => openCloseBuy(ticketsToBuy) }>comprar</Button>
                    </div>
                ) ) }
            </div> }

            { showCheck && <div className='listContainer'>
                { showTickets2.map( (ticketsToCheck) => (
                    <div className='OneTicket'>
                        <div className='info'>
                            <p>Destino: {ticketsToCheck.data.destino}</p>
                            <p>{ticketsToCheck.data.fecha}</p>
                            <p>Duracion: {ticketsToCheck.data.duracion}</p>
                        </div> 

                        <Button variant='contained' onClick={ () => openCloseTicket(ticketsToCheck)}>Visualizar</Button>
                    </div>
                ) ) }
            </div> }

            { openTicket && <Ticket infoVuelo={infoVuelo} close={openCloseTicket}/> }
            { buyTicket && <BuyModal infoVuelo={infoVuelo} close={openCloseBuy}/> }

        </div>
    )
}

export default Checking