import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorPage from './routes/ErrorPage'
import Root from './routes/Root'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ContextProvider from './context/contextProvider'
import Home from './routes/Home'
import Buy from './routes/Buy'
import Checking from './routes/Checking'
import Login from './routes/Login'
import Register from './routes/Register'
import Sell from './routes/Sell'
import './style.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/home',
        element: <Home/>,
      },
      {
        path: '/login',
        element: <Login/>,
      },
      {
        path: '/register',
        element: <Register/>,
      },
      {
        path: '/checking',
        element: <Checking/>,
      },
      {
        path: '/buy',
        element: <Buy/>,
      },
      {
        path: '/sell',
        element: <Sell/>,
      }
    ], 
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
)
