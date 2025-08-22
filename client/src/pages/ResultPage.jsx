import { useEffect, useState } from 'react'
import Accordian from '../components/Accordian'
import Navbar from '../components/Navbar'
import ResultCard from '../components/ResultCard'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import FeedbackAccordian from '../components/FeedbackAccordian'


const ResultPage = () => {

    const [interviewData, setInterviewData] = useState(null)
    const [isScoreUpdated, setIsScoreUpdated] = useState(false);

    const { id } = useParams()

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

    // utility function
    function formatDurationHuman(startTime, endTime) {
        const durationMs = endTime - startTime;
        const totalSeconds = Math.floor(durationMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        let result = "";
        if (minutes > 0) {
            result += minutes === 1 ? "1 minute" : `${minutes} minutes`;
        }
        if (seconds > 0) {
            if (minutes > 0) result += " and ";
            result += seconds === 1 ? "1 second" : `${seconds} seconds`;
        }
        if (minutes === 0 && seconds === 0) {
            result = "0 seconds";
        }
        return result;
    }

    const interviewStartTime = interviewData?.interview.interviewStartTime
    const interviewEndTime = interviewData?.interview.interviewEndTime
    const duration = formatDurationHuman(new Date(interviewStartTime), new Date(interviewEndTime))

    // utility function
    const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

    const computeOverallScore = (interviewData) => {
        const interviewAvgRating = interviewData?.interview_data.reduce((sum, i) => sum + i.rating_average, 0) / interviewData?.interview_data.length;

        const overallScore = interviewData?.facialAnaylsis.nonVerbalScore + interviewAvgRating.toFixed(2) / 2


        return Number(overallScore.toFixed(1))
    }

    const score = computeOverallScore(interviewData?.interview)

    useEffect(() => {

        if (!score || isScoreUpdated) return; // skip if score is null/undefined

        // update the interview session data
        const updateScore = async () => {
            try {
                const updateInterviewStatus = await axios.patch("http://localhost:4000/api/interview/update", {
                    interviewId: id,
                    overallScore: score
                }, {
                    headers: {
                        type: "application/json"
                    }
                })

                if (updateInterviewStatus.status === 200) {
                    console.log("Updated overallScore")
                    setIsScoreUpdated(true)
                }
            } catch (error) {
                console.error("Error updating overallScore", error)
                toast.error("Error updating overallScore")

            }
        }
        updateScore()
    }, [id, score,isScoreUpdated])

    return (
        <>
            <Navbar />

            <div className="flex flex-col items-center justify-center gap-5 max-w-[900px]  mx-auto mt-20 mb-20 px-2">
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <h1 className='text-5xl font-semibold'>Interview Performance Report</h1>
                    <p className='text-center font-light text-md text-black/70'>Below is a summary of your performance along with detailed feedback and recommendations.</p>
                </div>

                <ResultCard level={capitalize(interviewData?.interview.interview_level)} category={capitalize(interviewData?.interview.interview_category)} questionQuantity={interviewData?.interview.interview_data.length} duration={duration} score={interviewData?.interview.overallScore} />

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
                    <FeedbackAccordian data={interviewData?.interview.facialAnaylsis} />
                </div>

            </div>

        </>
    )
}

export default ResultPage