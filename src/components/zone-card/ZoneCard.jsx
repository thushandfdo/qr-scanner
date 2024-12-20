const ZoneCard = ({ id, active = false, title = '-', setSelectedZone }) => {
    const onZoneClick = () => {
        setSelectedZone(id);
    };

    return (
        <div
            onClick={onZoneClick}
            className={`flex flex-col cursor-pointer ${active ? 'bg-black' : ''}`}
        >
            {active && <div className="h-3 bg-primary-gray rounded-br-2xl"></div>}
            <div className="text-gray-200 bg-primary-gray">
                <div
                    className={`rounded-l-2xl ml-2 ${active ? 'bg-black border-r-2 border-gray-100' : 'hover:bg-black hover:rounded-2xl hover:mr-2'}`}
                >
                    <div className={`-rotate-90 h-36 flex items-center justify-center whitespace-nowrap`}>
                        <span
                            className={`text-xl ${active ? 'font-semibold' : ''}`}
                        >
                            {title}
                        </span>
                    </div>
                </div>
            </div>
            {active && <div className="h-3 bg-primary-gray rounded-tr-2xl"></div>}
        </div>
    );
};

export default ZoneCard;
