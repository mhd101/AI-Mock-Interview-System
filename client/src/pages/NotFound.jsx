import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BiError } from "react-icons/bi";



const NotFound = () => {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 1000)
    })
    return (
        <>
        <div className="flex flex-col justify-center items-center h-screen gap-2 ">
            <BiError size={70} />
            <h1 className="text-5xl font-semibold">Page Not Found</h1>
        </div>
        </>
    )
}

export default NotFound