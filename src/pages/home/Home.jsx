import { useRef, useState, useEffect, useMemo } from 'react';

// local imports
import { CheckCard, DisplayArea, EventLayer, ScanArea, ZoneCard } from '../../components';
import { icons } from '../../consts';
import useFetch from '../../hooks/useFetch';

const zones = [
    { id: 0, title: 'Regular' },
    { id: 1, title: 'Back Stage' },
    { id: 2, title: 'VIP' }
];

const eventName = 'Night with WAYO';

const BASE_URL = 'http://localhost:4003/scan/check-in';

const Home = () => {
    const inputRef = useRef(null);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [index, setIndex] = useState(0);

    const [selectedZone, setSelectedZone] = useState(0);
    const [checkIn, setCheckIn] = useState(true);

    const [status, setStatus] = useState(null);

    const options = useMemo(
        () => ({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                index: index,
                requestedZone: zones[selectedZone]?.title || ''
            })
        }),
        [index, selectedZone]
    );
    const { data, loading, error } = useFetch(BASE_URL, index !== null ? options : null);

    const setFocus = () => {
        inputRef.current.focus();
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
        setStatus(null);
    };

    useEffect(() => {
        if (output.length !== 11) return;

        setOutput(output);

        const ind = JSON.parse(output)['INDEX'];
        setIndex(ind);
        console.log('index', ind);

        if (data) {
            const { message } = data;
            if (message === 'QR code validated. Status set to IN') {
                setStatus('success');
            } else if (message === 'Already checked in') {
                setStatus('warning');
            } else {
                setStatus('error');
            }
        } else {
            setStatus('error');
        }

        setTimeout(() => {
            setInput('');
        }, 2000);
    }, [data, loading, output, selectedZone]);

    return (
        <div className="">
            <EventLayer />
            <div className="flex h-screen py-4" onClick={setFocus}>
                <div className="flex flex-col justify-between w-16 gap-1 mt-5">
                    <div className="">
                        {zones.map((zone) => (
                            <ZoneCard
                                key={zone.id}
                                id={zone.id}
                                title={zone.title}
                                active={selectedZone === zone.id}
                                setSelectedZone={setSelectedZone}
                            />
                        ))}
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
                <div className="flex flex-col w-full sm:flex-row rounded-l-lg bg-gradient-to-r from-gray-400 from-10% via-gray-100 to-white">
                    <div className="w-[50%]">
                        <ScanArea
                            inputRef={inputRef}
                            input={input}
                            setInput={setInput}
                            setOutput={setOutput}
                            handleClear={handleClear}
                            eventName={eventName}
                            zone={zones[selectedZone].title}
                        />
                    </div>
                    <div className="w-[50%]">
                        {!loading && !error && (
                            <DisplayArea output={output} status={status} isCheckingIn={checkIn} />
                        )}
                        {status === 'error' && error && (
                            <DisplayArea output={output} error={error} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
