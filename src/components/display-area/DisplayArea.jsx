const DisplayArea = ({ output, status, error, message, attempt, updatedAt }) => {
    const isSuccess = status === 'success' && !error;
    const isError = status === 'error' || error;

    return (
        <div className="flex flex-col items-center justify-center min-h-full gap-5">
            {isSuccess && (
                <div className="p-5 bg-green-400 shadow-2xl text-green-950 rounded-2xl">
                    <div className="border-2 border-green-900 rounded-xl w-[500px] h-[300px] flex flex-col gap-5 justify-center items-center text-3xl">
                        <p>ID: {output}</p>
                        <p className="font-semibold">
                            {'is a valid attempt'}
                        </p>
                        {attempt && <p>Attempt: {attempt}</p>}
                        {updatedAt && <p>Updated at: {updatedAt}</p>}
                    </div>
                </div>
            )}
            {isError && (
                <div className="p-5 bg-red-400 shadow-2xl text-red-950 rounded-2xl">
                    <div className="border-2 border-red-900 rounded-xl w-[500px] h-[300px] flex flex-col gap-5 justify-center items-center text-3xl">
                        <p>ID: {output}</p>
                        <p className="font-semibold">{message || 'is not eligible to this zone'}</p>
                        <p className="text-4xl italic font-bold">Rejected...!</p>
                        {attempt && <p>Attempt: {attempt}</p>}
                        {updatedAt && <p>Updated at: {updatedAt}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisplayArea;

