import { useState } from 'react';

const ScanArea = ({
    inputRef,
    setOutput,
    handleClear,
}) => {
    const [input, setInput] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);

        const groups = input.match(/.{1,3}/g);

        if (groups) {
            groups.pop();
            const asciiString = groups
                .map((group) => String.fromCharCode(parseInt(group, 10)))
                .join('');
            setOutput(asciiString);
        } else {
            setOutput('');
        }
    };

    const clearScreen = () => {
        setInput('');
        handleClear();
    }

    return (
        <div className="flex flex-col items-center justify-center h-full gap-5">
            <p className="mb-2 text-5xl font-semibold">Event Name</p>
            <p className="mb-10 text-2xl italic text-gray-800">
                Welcome to the
                <span className="p-2 text-3xl font-semibold tracking-widest text-blue-700">
                    VIP
                </span>
                zone..!
            </p>
            <div className="flex flex-col items-center gap-3">
                <input
                    ref={inputRef}
                    type="text"
                    className="p-2 text-center border border-black rounded-lg w-96"
                    placeholder="Scan your QR Code..."
                    value={input}
                    onChange={(e) => handleChange(e)}
                />
                <button 
                    className="w-48 px-4 py-2 font-semibold tracking-wider text-white uppercase rounded-lg bg-slate-800"
                    onClick={clearScreen}
                >
                    Clear Screen
                </button>
            </div>
        </div>
    );
};

export default ScanArea;
