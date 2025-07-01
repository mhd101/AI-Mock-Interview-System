import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar text="Register" onclick={() => navigate("/register")} accountExist="Don't have an account?" />
            <Hero />
        </>
    )
}

export default HomePage