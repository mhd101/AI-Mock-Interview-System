import {Routes, Route} from 'react-router-dom'
import NotFound from './pages/NotFound'
import HomePage from './pages/HomePage'

const App = () => {
  return (
   <>
   <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/signup' element={<h1>Register Page</h1>} />
    <Route path='/login' element={<h1>Login Page</h1>} />
    
    <Route path='*' element={<NotFound />} />
    
   </Routes>
   </>
  )
}

export default App