import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Root = () => {

    const navigate = useNavigate()
    useEffect( () => navigate('/home'), [] )

    return(
        <>
            <Outlet/>
        </>
    )
}

export default Root