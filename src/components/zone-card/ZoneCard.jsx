const ZoneCard = ({ id, active = false, title = '-', setSelectedZone }) => {
    const onZoneClick = () => {
        setSelectedZone(id);
    };

    return (
        <div
            onClick={onZoneClick}
            className={`flex flex-col cursor-pointer ${active ? 'bg-gray-400' : ''}`}
        >
            {active && <div className="h-3 bg-white rounded-br-2xl"></div>}
            <div className="bg-white">
                <div
                    className={`rounded-l-2xl ${active ? 'bg-gray-400 ml-2' : 'hover:bg-gray-400 hover:rounded-2xl hover:mx-2'}`}
                >
                    <div className="flex items-center justify-center -rotate-90 h-28 whitespace-nowrap">
                        <span
                            className={`text-xl ${active ? 'font-semibold border-b-2 border-gray-100 pb-3 px-2 mt-3' : ''}`}>
                            {title}
                        </span>
                    </div>
                </div>
            </div>
            {active && <div className="h-3 bg-white rounded-tr-2xl"></div>}
        </div>
    );
};

export default ZoneCard;
