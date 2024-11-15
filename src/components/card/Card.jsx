const Card = ({ zone = "Zone 01", count = 0, capacity = 100}) => {
    return (
        <div className="bg-gray-400 rounded-3xl">
            <div className="flex flex-col items-center justify-center gap-3 p-8 m-4 border-2 rounded-xl">
                <span className="text-3xl font-semibold">{zone}</span>
                <span className="text-xl">{count}/{capacity}</span>
            </div>
        </div>
    );
};

export default Card;
