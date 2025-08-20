import { useEffect, useState } from 'react'
import Accordian from '../components/Accordian'
import Navbar from '../components/Navbar'
import ResultCard from '../components/ResultCard'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'


const ResultPage = () => {

    const [interviewData, setInterviewData] = useState(null)

    const { id } = useParams()

    console.log(id)

    useEffect(() => {
        if (!id) return;

        const fetchInterviewData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/interview/${id}`)
                if (response.status === 200) {
                    console.log("Interview Session data retrieved !!")
                }
                setInterviewData(response.data)

            } catch (error) {
                console.log("Error Retrieving Interview Session Data", error)
                toast.error("Error retrieving interview session data")
            }
        }

        if (id) {
            fetchInterviewData()
        }

    }, [id])

    const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

    return (

        
        <>
            <Navbar />

            <div className="flex flex-col items-center justify-center gap-5 max-w-[900px]  mx-auto mt-20 mb-20 px-2">
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <h1 className='text-5xl font-semibold'>Interview Performance Report</h1>
                    <p className='text-center font-light text-md text-black/70'>Below is a summary of your performance along with detailed feedback and recommendations.</p>
                </div>

                <ResultCard level={capitalize(interviewData?.interview.interview_level)} category={capitalize(interviewData?.interview.interview_category)} questionQuantity={interviewData?.interview.interview_data.length}/>

                <div className='w-full flex flex-col justify-center items-center gap-5'>
                    <div className='flex flex-col gap-2 justify-center items-center'>
                        <h1 className='text-3xl font-semibold'>Verbal Feedback</h1>
                        <p className='text-center font-light text-md text-black/70'>You can toggle each question to see the detailed feedback of each question</p>
                    </div>
                    <Accordian data={interviewData?.interview.interview_data} />
                </div>

                <div className='w-full flex flex-col justify-center items-center gap-5'>
                    <div className='flex flex-col gap-2 justify-center items-center'>
                        <h1 className='text-3xl font-semibold'>Non-Verbal Feedback</h1>
                        <p className='text-center font-light text-md text-black/70'>You can check your non-verbal feedback throughout the interview </p>
                    </div>
                </div>

            </div>

        </>
    )
}

export default ResultPage