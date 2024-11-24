import { useState } from "react";

const EventLayer = ({ setEventId }) => {
    const [text, setText] = useState('');

    return (
        <div className="fixed z-10 flex items-center justify-center w-full h-screen gap-3 bg-white bg-opacity-90">
            <input
                type="text"
                className="p-2 text-center border border-black rounded-lg"
                placeholder="Enter the Event ID..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                onClick={() => setEventId(text)}
                className="flex items-center justify-center h-[42px] gap-2 p-2 px-4 py-1 text-white uppercase bg-black rounded-lg"
            >
                <span>Submit</span>
            </button>
        </div>
    );
};

export default EventLayer;
