// local imports
import { images } from "../../consts";

const ScanArea = ({
    inputRef,
    setOutput,
    handleClear,
    checkEntry,
    eventName,
    input,
    setInput
}) => {
    const handleCheck = async (value) => {
        setOutput(value);
        await checkEntry(value);
        setInput('');
    };

    const updateInput = (value) => {
        setInput(value);
        setTimeout(() => {
            setInput('');
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-5 text-gray-100">
            <img src={images.logo} alt="logo" className='w-96 h-9w-96' />
            <p className="mb-2 text-5xl font-semibold">{eventName}</p>
            <div className="flex flex-col items-center gap-5">
                <input
                    autoFocus
                    ref={inputRef}
                    type="text"
                    className="p-2 text-center text-black border border-black rounded-lg w-96"
                    placeholder="Scan your QR Code..."
                    value={input}
                    onChange={(e) => updateInput(e.target.value)}
                    onKeyDown={(e) =>
                        e.key === 'Enter' && input.length > 0 && handleCheck(e.target.value.trim())
                    }
                />
                <button
                    className="w-48 px-4 py-2 font-semibold tracking-wider text-white uppercase rounded-lg bg-slate-500"
                    onClick={handleClear}>
                    Clear Screen
                </button>
            </div>
        </div>
    );
};

export default ScanArea;
