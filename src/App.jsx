import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes , Route} from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h2 className='text-center'>Power Datamate</h2>
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/home' element={<Home/>}/>
   </Routes>
    </>
  )
}

export default App
