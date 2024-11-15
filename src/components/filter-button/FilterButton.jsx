const FilterButton = ({ zone, selectedZone, setZone }) => {
    return (
        <button
            onClick={() => setZone(zone)}
            className={`px-4 py-1 rounded-2xl hover:ring-2 hover:ring-black ${
                selectedZone === zone ? 'bg-black text-white' : 'bg-gray-300'
            }`}>
            {zone}
        </button>
    );
};

export default FilterButton;
