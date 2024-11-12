import { useRef, useState } from 'react';

// local imports
import { CheckCard, DisplayArea, ScanArea, ZoneCard } from '../../components';
import { icons } from '../../consts';
import useFetch from '../../hooks/useFetch';

const Home = () => {
    const inputRef = useRef(null);
    const [output, setOutput] = useState('');

    const [selectedZone, setSelectedZone] = useState(0);
    const [checkIn, setCheckIn] = useState(true);

    // const { data, loading, error } = useFetch('http://localhost:4003/scan/check-in');

    const setFocus = () => {
        inputRef.current.focus();
    };

    const handleClear = () => {
        setOutput('');
    };

    return (
        <div className="flex h-screen py-4" onClick={setFocus}>
            <div className="flex flex-col justify-between w-16 gap-1 mt-5">
                <div className="">
                    <ZoneCard
                        id={0}
                        title="Zone 01"
                        active={selectedZone === 0}
                        setSelectedZone={setSelectedZone}
                    />
                    <ZoneCard
                        id={1}
                        title="Zone 01"
                        active={selectedZone === 1}
                        setSelectedZone={setSelectedZone}
                    />
                    <ZoneCard
                        id={2}
                        title="Zone 01"
                        active={selectedZone === 2}
                        setSelectedZone={setSelectedZone}
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <CheckCard
                        image={icons.checkIn}
                        text="in"
                        active={checkIn}
                        swapStatus={setCheckIn}
                    />
                    <CheckCard
                        image={icons.checkOut}
                        text="out"
                        active={!checkIn}
                        swapStatus={setCheckIn}
                    />
                </div>
            </div>
            <div className="flex flex-col w-full sm:flex-row">
                <div className="w-[60%] bg-gradient-to-r from-gray-400 to-gray-100 rounded-l-lg">
                    <ScanArea
                        inputRef={inputRef}
                        setOutput={setOutput}
                        handleClear={handleClear}
                    />
                </div>
                <div className="w-[40%] bg-gradient-to-r from-gray-100 to-white">
                    <DisplayArea output={output} />
                </div>
            </div>
        </div>
    );
};

export default Home;
