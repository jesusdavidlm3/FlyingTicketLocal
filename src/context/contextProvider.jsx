import { useState } from "react"
import { context } from './context'

const ContextProvider = ({children}) => {

    const [userInfo, setUserInfo] = useState('')

    return(
        <context.Provider value={{userInfo, setUserInfo}}>
            {children}
        </context.Provider>
    )
}

export default ContextProvider;