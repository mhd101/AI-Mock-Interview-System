import { useState, useRef, useEffect } from "react";

const Transcribing = ({ speechText }) => {

    const [text, setText] = useState("");

    useEffect(() => {
        setText(speechText);
    }, [speechText]);

    return (
        <>
            {
                text ? <textarea value={speechText} onChange={(e) => setText(e.target.value)} className="w-full italic text-black/60  overflow-auto resize-none scroll-auto" rows={3}></textarea> : <p className="w-full italic text-black/60">Your speech will be displayed here as text.</p>
            }


        </>
    );
};

export default Transcribing;
