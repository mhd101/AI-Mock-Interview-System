import { useForm } from "react-hook-form"

const InterviewCard = () => {

    const {register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <>
            <div className="flex flex-col justify-around items-center max-w-[1024px] min-h-[calc(100vh-5rem)] mx-auto  text-center border-1">
                <div className=" flex flex-col gap-4 w-xl px-15 py-10 rounded-md outline-gray-400/50 outline-1">
                    <div className="w-full flex flex-col gap-1">
                        <h2 className="text-2xl font-medium">Practice Technical Interview</h2>
                        <p className="text-center font-light text-sm text-black/70">Select question category, level and no. of questions to generate interview questions and practice answering them.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

                        <div className="flex flex-col items-start gap-0.5">
                            <label>Select Category:</label>
                            <p className="text-sm font-light text-black/70">Choose the programming language or technology</p>
                            <select id="category" {...register("category", { required: "This field is required"})} className="px-2 py-2 mt-1 rounded-md outline-gray-400 font-light text-sm outline-1 w-full ">
                                <option value="" className="font-light">--Select--</option>
                                <option value="javascript" className="font-light">JavaScript</option>
                                <option value="java" className="font-light">Java</option>
                                <option value="python" className="font-light">Python</option>
                                <option value="operating system" className="font-light">Operating System</option>
                                <option value="computer networks" className="font-light">Computer Networks</option>
                                <option value="database management system" className="font-light">Database Management System</option>
                                <option value="software engineering" className="font-light">Software Engineering</option>
                            </select>
                            <p className="text-red-600 text-sm mt-1">{errors.category?.message}</p>
                        </div>

                       
                       <div className="flex flex-col items-start gap-0.5">
                            <label>Select Level:</label>
                            <p className="text-sm font-light text-black/70">Choose the difficulty level of questions</p>
                            <select id="category" {...register("level", { required: "This field is required"})} className="px-2 py-2 mt-1 rounded-md outline-gray-400 font-light text-sm outline-1 w-full ">
                                <option value="" className="font-light">--Select--</option>
                                <option value="beginner" className="font-light">Beginner</option>
                                <option value="intermediate" className="font-light">Intermediate</option>
                                <option value="advanced" className="font-light">Advanced</option>
                            </select>
                            <p className="text-red-600 text-sm mt-1">{errors.level?.message}</p>
                        </div>

                        <div className="flex flex-col items-start gap-0.5">
                            <label>Select Questions:</label>
                            <p className="text-sm font-light text-black/70">Choose no. of questions</p>
                            <select id="category" {...register("questionQuantity", { required: "This field is required"})} className="px-2 py-2 mt-1 rounded-md outline-gray-400 font-light text-sm outline-1 w-full ">
                                <option value="" className="font-light">--Select--</option>
                                <option value="three" className="font-light">3</option>
                                <option value="five" className="font-light">5</option>
                                <option value="ten" className="font-light">10</option>
                            </select>
                            <p className="text-red-600 text-sm mt-1">{errors.questionQuantity?.message}</p>
                        </div>

                        
                        <button type="submit" className="w-full bg-black text-white px-10 py-4 rounded-md">Generate Questions</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default InterviewCard