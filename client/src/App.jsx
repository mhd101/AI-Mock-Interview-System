import {Routes, Route, Navigate} from 'react-router-dom'
import NotFound from './pages/NotFound'

const App = () => {
  return (
   <>
   <Routes>
    <Route path='/' element={<h1>Home Page</h1>} />
    <Route path='/register' element={<h1>Register Page</h1>} />
    <Route path='/login' element={<h1>Login Page</h1>} />
    
    <Route path='*' element={<NotFound />} />
    
   </Routes>
   </>
  )
}

export default App