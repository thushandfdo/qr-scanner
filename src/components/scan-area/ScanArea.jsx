const ScanArea = ({
    inputRef,
    setOutput,
    handleClear,
    checkEntry,
    eventName,
    zone,
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
        <div className="flex flex-col items-center justify-center h-full gap-5">
            <p className="mb-2 text-5xl font-semibold">{eventName}</p>
            <p className="mb-10 text-2xl italic text-gray-800">
                Welcome to the
                <span className="p-2 text-3xl font-semibold tracking-wider text-blue-700">
                    {zone}
                </span>
                zone..!
            </p>
            <div className="flex flex-col items-center gap-3">
                <input
                    autoFocus
                    ref={inputRef}
                    type="text"
                    className="p-2 text-center border border-black rounded-lg w-96"
                    placeholder="Scan your QR Code..."
                    value={input}
                    onChange={(e) => updateInput(e.target.value)}
                    onKeyDown={(e) =>
                        e.key === 'Enter' && input.length > 0 && handleCheck(e.target.value.trim())
                    }
                />
                <button
                    className="w-48 px-4 py-2 font-semibold tracking-wider text-white uppercase rounded-lg bg-slate-800"
                    onClick={handleClear}>
                    Clear Screen
                </button>
            </div>
        </div>
    );
};

export default ScanArea;
