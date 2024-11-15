const DisplayArea = ({ output, status, isCheckingIn = true, error }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-full gap-5">
            {status === 'success' && (
                <div className="p-5 bg-green-400 shadow-2xl text-green-950 rounded-2xl">
                    <div className="border-2 border-green-900 rounded-xl w-[500px] h-[300px] flex flex-col gap-5 justify-center items-center text-3xl">
                        <p className="">ID: {output}</p>
                        <p className="font-semibold">
                            {isCheckingIn ? 'is eligible to this zone' : 'is a valid check-out'}
                        </p>
                        <p className="text-4xl italic font-bold">
                            {isCheckingIn ? 'Enjoy...!' : 'Have a nice Day...!'}
                        </p>
                    </div>
                </div>
            )}
            {status === 'warning' && (
                <div className="p-5 bg-yellow-400 shadow-2xl text-yellow-950 rounded-2xl">
                    <div className="border-2 border-yellow-900 rounded-xl w-[500px] h-[300px] flex flex-col gap-5 justify-center items-center text-3xl">
                        <p className="">ID: {output}</p>
                        <p className="font-semibold">
                            {isCheckingIn ? 'is already in this zone' : 'is already cheked-out'}
                        </p>
                        <p className="text-4xl italic font-bold">Warning...!</p>
                    </div>
                </div>
            )}
            {(status === 'error' || error) && (
                <div className="p-5 bg-red-400 shadow-2xl text-red-950 rounded-2xl">
                    <div className="border-2 border-red-900 rounded-xl w-[500px] h-[300px] flex flex-col gap-5 justify-center items-center text-3xl">
                        {error ? (
                            <>
                                <p className="">{output}</p>
                                <p className="font-semibold">Something went wrong...!</p>
                                <p className="">{error}</p>
                            </>
                        ) : (
                            <>
                                <p className="">ID: {output}</p>
                                <p className="font-semibold">is not eligible to this zone</p>
                                <p className="text-4xl italic font-bold">Rejected...!</p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisplayArea;
