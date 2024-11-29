const DisplayArea = ({ output, status, isCheckingIn = true, error, errorMsg }) => {
    const containerStyles =
        'p-5 shadow-2xl rounded-2xl w-[500px] h-[300px] flex flex-col gap-5 justify-center items-center text-3xl';
    const successStyles = 'bg-green-400 text-green-950 border-2 border-green-900';
    const errorStyles = 'bg-red-400 text-red-950 border-2 border-red-900';

    const isSuccess = status === 'success' && !error;
    const isError = status === 'error' || error;

    return (
        <div className="flex flex-col items-center justify-center min-h-full gap-5">
            {isSuccess && (
                <div className={`${containerStyles} ${successStyles}`}>
                    <p>ID: {output}</p>
                    <p className="font-semibold">
                        {isCheckingIn ? 'is eligible to this zone' : 'is a valid check-out'}
                    </p>
                </div>
            )}
            {isError && (
                <div className={`${containerStyles} ${errorStyles}`}>
                    <p>Index: {output}</p>
                    <p className="font-semibold">{errorMsg || 'is not eligible to this zone'}</p>
                    <p className="text-4xl italic font-bold">Rejected...!</p>
                </div>
            )}
        </div>
    );
};

export default DisplayArea;
