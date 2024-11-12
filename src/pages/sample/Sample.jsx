import { useState, useRef } from 'react';

// local imports
import useFetch from '../../hooks/useFetch';

const Sample = () => {
    const inputRef = useRef(null);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const { data, loading, error } = useFetch('http://localhost:4003/scan/check-in');

    const setFocus = () => {
        inputRef.current.focus();
    };

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

    const handleClear = () => {
        setInput('');
        setOutput('');
    };

    return (
        <div
            className="flex flex-col items-center justify-center w-full h-screen"
            onClick={setFocus}
        >
            <p className="mb-2 font-semibold">Decoded Data:</p>
            <div className="p-2 text-lg font-semibold border-2 rounded-lg border-slate-600">
                <span className="text-red-500">{output}</span>
            </div>
            <hr className="w-[95%] border-gray-400 my-5" />
            <input
                ref={inputRef}
                type="text"
                className="p-2 m-2 text-center border border-black rounded-lg"
                value={input}
                onChange={(e) => handleChange(e)}
                placeholder="Scan QR Code..."
            />
            <button className="px-4 py-2 text-white rounded-lg bg-slate-800" onClick={handleClear}>
                Clear Input
            </button>
        </div>
    );
};

export default Sample;
