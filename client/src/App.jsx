import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'
import Interview from './pages/Interview'
import InterviewSession from './pages/InterviewSession'
import MyInterviews from './pages/MyInterviews'
import InterviewHistory from './pages/InterviewHistory'
import ProfileSettings from './pages/ProfileSettings'
import Profile from './pages/Profile'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />


        <Route path='/interview'>
          <Route index element={<Interview />}/>
        <Route path='session' element={<InterviewSession />} />
        </Route>

        <Route path='/my-interviews' element={<MyInterviews />} />
        <Route path='/interview-history' element={<InterviewHistory />} />
        <Route path='/profile-settings' element={<ProfileSettings />} />
        <Route path='/user-profile' element={<Profile />} />



        <Route path='*' element={<NotFound />} />

      </Routes>
    </>
  )
}

export default App