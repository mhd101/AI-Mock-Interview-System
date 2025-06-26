import {Routes, Route, Navigate} from 'react-router-dom'

const App = () => {
  return (
   <>
   <Routes>
    <Route path='/' element={<h1>Home Page</h1>} />
    <Route path='/register' element={<h1>Register Page</h1>} />
    <Route path='/login' element={<h1>Login Page</h1>} />
    
    <Route path='*' element={<Navigate  to='/' />} />
    
   </Routes>
   </>
  )
}

export default App