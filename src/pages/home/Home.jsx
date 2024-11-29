import { useRef, useState, useEffect } from 'react';

// local imports
import { CheckCard, DisplayArea, EventLayer, ScanArea, ZoneCard } from '../../components';
import { icons } from '../../consts';
import useFetch from '../../hooks/useFetch';

const Home = () => {
    const inputRef = useRef(null);
    
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [selectedZone, setSelectedZone] = useState(1);
    const [isCheckIn, setIsCheckIn] = useState(true);
    const [status, setStatus] = useState(null);
    const [eventId, setEventId] = useState(0);
    const [event, setEvent] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const { loading, error, fetchData } = useFetch();

    const setFocus = () => {
        inputRef.current.focus();
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
        setStatus(null);
    };

    const isJson = (str) => {
        try {
            return JSON.parse(str);
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    useEffect(() => {
        handleClear();
    }, [selectedZone, isCheckIn]);

    useEffect(() => {
        if (eventId === 0) return;

        const getData = async () => {
            const response = await fetchData(`https://event.eagleeyelk.com/api/event/getevent/${eventId}`);
            if (response && response.result) {
                const { result } = response;
                const zones = result.zones.map((zone) => {
                    return {
                        id: zone.level,
                        title: zone.type,
                        capacity: zone.limit
                    };
                });
                setEvent({
                    id: result.id,
                    name: result.title,
                    zones
                });
            }
        };
        getData();
    }, [eventId, fetchData]);

    useEffect(() => {
        if (output.length < 11) return;

        const obj = isJson(output);
        if (obj) {
            setOutput(output);

            const getData = async () => {
                const result = await fetchData(`https://qr.eagleeyelk.com/scan/check-${isCheckIn ? 'in' : 'out'}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        index: obj['INDEX'],
                        requestedZone: selectedZone,
                    })
                });

                if (result) {
                    const { status_code, message } = result;
                    setErrorMsg(message);
                    if (status_code === 200) {
                        setStatus('success');
                    } else {
                        setStatus('error');
                    }
                } else {
                    setStatus('error');
                }

                // setTimeout(() => {
                //     setInput('');
                // }, 500);
            };
            getData();
        }

        setTimeout(() => {
            setInput('');
        }, 500);
    }, [output]);

    return (
        <div className="">
            {eventId === 0 && <EventLayer setEventId={setEventId} />}
            <div className="flex h-screen py-4" onClick={setFocus}>
                <div className="flex flex-col justify-between w-16 gap-1 mt-5">
                    <div className="">
                        {event && event.zones.map((zone) => (
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
                            active={isCheckIn}
                            swapStatus={setIsCheckIn}
                        />
                        <CheckCard
                            image={icons.checkOut}
                            text="out"
                            active={!isCheckIn}
                            swapStatus={setIsCheckIn}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 grid-rows-2 w-full lg:grid-cols-2 lg:grid-rows-1 justify-center items-center rounded-l-lg bg-gradient-to-r from-gray-400 from-10% via-gray-100 to-white">
                    <div className="">
                        {event && <ScanArea
                            inputRef={inputRef}
                            input={input}
                            setInput={setInput}
                            setOutput={setOutput}
                            handleClear={handleClear}
                            eventName={event.name}
                            zone={event.zones.filter((zone) => zone.id === selectedZone)[0].title}
                        />}
                    </div>
                    <div className="">
                        {!loading && (
                            <DisplayArea error={error} errorMsg={errorMsg} output={output} status={status} isCheckingIn={isCheckIn} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
