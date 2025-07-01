import {Routes, Route} from 'react-router-dom'
import NotFound from './pages/NotFound'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'

const App = () => {
  return (
   <>
   <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/register' element={<Register />} />
    <Route path='/login' element={<Login />} />
    
    <Route path='*' element={<NotFound />} />
    
   </Routes>
   </>
  )
}

export default App