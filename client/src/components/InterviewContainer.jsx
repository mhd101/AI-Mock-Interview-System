import Transcribing from "./Transcribing"
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";


const InterviewContainer = () => {

    const [questions, setQuestions] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [transcript, setTranscript] = useState("")
    const [isRecording, setIsRecording] = useState(false)
    const [hasSpoken, setHasSpoken] = useState(false)
    const recognitionRef = useRef(null)
    const [voiceReady, setVoiceReady] = useState(false)
    const [voice, setVoice] = useState(null)
    const navigate = useNavigate()

    const loadVoices = () => {
        return new Promise((resolve) => {
            let voices = speechSynthesis.getVoices();
            if (voices.length) {
                resolve(voices);
            } else {
                speechSynthesis.onvoiceschanged = () => {
                    voices = speechSynthesis.getVoices();
                    resolve(voices);
                };
            }
        });
    }

    const speak = (text) => {
        if (!voice || !text) return;
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.voice = voice
        utterance.lang = voice.lang
        utterance.rate = 1
        utterance.pitch = 1
        speechSynthesis.cancel()
        speechSynthesis.speak(utterance)
    }

    useEffect(() => {
        loadVoices().then((voices) => {
            const selected =
                voices.find((v) => v.lang === 'en-GB' && !v.name.toLowerCase().includes('male')) ||
                voices.find((v) => v.lang === 'en-GB') ||
                voices.find((v) => v.lang.startsWith('en')) ||
                voices[0];
            setVoice(selected);
            setVoiceReady(true);
        });
    }, []);

    useEffect(() => {
        if (!voiceReady || !voice || questions.length === 0) return;

        const welcome = `Welcome Mohammad, Let's begin your interview.`;
        const question = `Question ${currentQuestionIndex + 1}: ${questions[currentQuestionIndex]}`;

        setTimeout(speak(`${welcome} ${question}`), 500);
    }, [voiceReady, voice, questions]);

    // Speak next question on index change
    useEffect(() => {
        if (!voiceReady || !voice || currentQuestionIndex === 0) return;
        const question = `Question ${currentQuestionIndex + 1}: ${questions[currentQuestionIndex]}`;
        setTimeout(speak(question), 500);
    }, [currentQuestionIndex]);

    useEffect(() => {
        const fetchQuestions = async () => {

            // mocking data
            const data = [
                "What is the difference between var, let, and const in javascript?",
                "Explain event delegation in Javascript?",
                "What is Closure?"
            ]

            setQuestions(data)
        }
        fetchQuestions()

        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            alert("You browser doesn't support Web Speech API")
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()
        recognition.lang = 'en-IN'
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                finalTranscript += event.results[i][0].transcript
            }
            setTranscript(finalTranscript)

            if (finalTranscript.trim()) {
                setHasSpoken(true) // mark that the user has started speaking
            }
        }

        recognition.onerror = (event) => {
            console.error("Speech recognition error: ", event.error)
        }

        recognitionRef.current = recognition
    }, [])

    useEffect(() => {
        const recognition = recognitionRef.current;
        if (!recognition) return;

        if (isRecording) {
            setTranscript('');
            setHasSpoken(false) // reset for new recording
            setTimeout(() => recognition.start(), 500);
        } else {
            recognition.stop()
        }
    }, [isRecording])


    const handleNext = () => {

        if(transcript === "" || !isRecording) {
            alert("Please answer this question !!")
            return;
        }
        if (currentQuestionIndex < questions.length - 1) {
            setTranscript('');
            setCurrentQuestionIndex(prev => prev + 1)
        }
    }

    const handleSubmit = () => {
        alert("Interview Submitted")

        navigate("/interview/session/result")
        
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-5 max-w-[1024px] h-screen mx-auto mt-[-76px] px-2">

                <div className="flex flex-col gap-10 outline-1 outline-gray-400/50 rounded-md py-10 px-10 w-full">
                    {/* Heading */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-semibold">JavaScript Mock Interview</h1>
                        <p className="text-right font-light text-sm text-black/60">Question {currentQuestionIndex + 1} of {questions.length} </p>
                    </div>

                    {/* Body */}
                    <div className="flex justify-around gap-8">
                        {/* Left Card */}
                        <div className="flex flex-col justify-around items-start gap-3 w-full">
                            <div className="flex flex-col gap-1 w-full">
                                <p className="font-medium">Question {currentQuestionIndex + 1}:</p>
                                <p className="">{questions[currentQuestionIndex]}<HiMiniSpeakerWave onClick={() => speak(questions[currentQuestionIndex])} className="cursor-pointer" /></p>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <p className="font-medium">Transcribing:</p>
                                <Transcribing
                                    speechText=
                                    {isRecording
                                        ? hasSpoken
                                            ? transcript || "Listening..."
                                            : "Listening..."
                                        : (transcript || "")} />

                            </div>
                            <div className="flex flex-col justify-between gap-2 bg-neutral-100/80 rounded-md px-3 py-3 outline-1 outline-gray-400/50">
                                <p className="font-medium flex items-center gap-2 mx-2 text-black/80"><MdOutlineTipsAndUpdates size={30} />
                                    Quick Tips</p>
                                <ul className="list-disc pl-8 text-sm text-black/80">
                                    <li>Take your time to think through your answer.</li>
                                    <li>Speak clearly and at a steady pace.</li>
                                    <li>Look at the camera when answering.</li>
                                    <li>If you're not happy with your answer, you can try again.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Right Card */}
                        <div className=" flex flex-col justify-between gap-4 w-full ">
                            <div className="flex justify-center items-center h-60 outline-1 rounded-md outline-gray-400/50 bg-neutral-100/80 text-black/80">
                                Camera Preview
                            </div>

                            <div className="flex justify-center items-center h-30 outline-1 rounded-md outline-gray-400/50 bg-neutral-100/80 text-black/80">
                                Real Time Feedback
                            </div>


                            <div className="flex justify-center items-center gap-2">
                                {currentQuestionIndex < questions.length - 1 ? (
                                    <>
                                        <button className="bg-black text-white px-8 py-2 rounded-md cursor-pointer" onClick={() => setIsRecording(prev => !prev)}>{isRecording ? "Stop" : "Record"}</button>
                                        <button className="bg-black text-white px-8 py-2 rounded-md cursor-pointer" onClick={handleNext}>Next</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="bg-black text-white px-8 py-2 rounded-md cursor-pointer" onClick={() => setIsRecording(prev => !prev)}>{isRecording ? "Stop" : "Record"}</button>
                                        <button className="bg-black text-white px-8 py-2 rounded-md cursor-pointer" onClick={handleSubmit}>Submit</button>
                                    </>

                                )}

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default InterviewContainer