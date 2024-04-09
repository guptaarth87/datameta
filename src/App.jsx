import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes , Route, Link} from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'
import CheckForeignKey from './Components/CheckForeingKey'
import Navbar from './Components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
   
   <Routes>
  
    <Route path='/' element={<Login/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/checkforeinkey' element={<CheckForeignKey/>}/>
   </Routes>
   <br></br>
    </>
  )
}

export default App
