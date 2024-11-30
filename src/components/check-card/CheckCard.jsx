const CheckCard = ({ image, text, active, swapStatus }) => {
    const handleClick = () => {
        swapStatus(text === 'in');
    };

    return (
        <div 
            className="flex flex-col items-center justify-center cursor-pointer"
            onClick={handleClick}
        >
            <img
                src={image}
                className={`w-10 mx-1 
                    ${active && text === 'in' ? 'bg-green-400' : active && text === 'out' ?'bg-red-400' : ''} 
                    ${active ? 'w-12 p-2 rounded-2xl' : ''} 
                `}
                alt="check-in"
            />
            <span
                className={`text-lg font-semibold tracking-widest 
                    ${active && text === 'in' ? 'text-green-700' : active && text === 'out' ? 'text-red-500' : ''} 
                uppercase`}
            >
                {text}
            </span>
        </div>
    );
};

export default CheckCard;
