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
    const [message, setMessage] = useState(null);
    const [logs, setLogs] = useState([]);
    const [attempt, setAttempt] = useState(null);
    const [updatedAt, setUpdatedAt] = useState(null);

    const { loading, error, fetchData } = useFetch();

    const setFocus = () => {
        inputRef.current.focus();
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
        setStatus(null);
    };

    useEffect(() => {
        handleClear();
    }, [selectedZone, isCheckIn]);

    useEffect(() => {
        if (eventId === 0) return;

        const getData = async () => {
            const response = await fetchData(
                `https://event.eagleeyelk.com/api/event/getevent/${eventId}`
            );
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

    // Load logs from localStorage on component mount
    useEffect(() => {
        const storedLogs = JSON.parse(localStorage.getItem('checkinLogs')) || [];
        setLogs(storedLogs);
    }, []);

    const downloadLogFile = () => {
        const logData = logs.join('\n');
        const blob = new Blob([logData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'checkin_log.txt';
        a.click();
    };

    const checkEntry = async (value) => {
        if (Number.isNaN(Number(value))) {
            setMessage('Invalid QR Code');
            setStatus('error');
            return;
        }

        const result = await fetchData(
            `https://qr.eagleeyelk.com/scan/check-${isCheckIn ? 'in' : 'out'}`,
            {
                method: 'POST',
                body: JSON.stringify({
                    index: Number(value),
                    requestedZone: selectedZone,
                    event: eventId
                })
            }
        );

        if (result) {
            const { status_code, message, attendance } = result;
            let localDate = null;
            let attempt = null;
            // Safely handle the case where `attendance` might be missing
            if (attendance) {
                const { updatedAt } = attendance;
                attempt = attendance.attempt;
                if (updatedAt) {
                    const utcDate = new Date(updatedAt);
                    localDate = utcDate.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
                }
            }
            setMessage(message);
            setAttempt(attempt);
            setUpdatedAt(localDate);
            if (status_code === 200) {
                setStatus('success');
            } else {
                setStatus('error');
            }

            // Add a new log entry
            const timestamp = new Date().toISOString();
            const logEntry = `${timestamp} - ${value} - ${selectedZone} - ${isCheckIn ? 'in' : 'out'} - ${message}`;
            const newLogs = [...logs, logEntry];

            setLogs(newLogs);
            localStorage.setItem('checkinLogs', JSON.stringify(newLogs));
        } else {
            setStatus('error');
        }
    };

    return (
        <div className="">
            {eventId === 0 && <EventLayer setEventId={setEventId} />}
            <div className="flex h-screen bg-primary-gray" onClick={setFocus}>
                <div className="flex flex-col justify-between w-16 gap-1 mt-5">
                    <div className="">
                        {event &&
                            event.zones.map((zone) => (
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
                        <span onClick={downloadLogFile} className='w-full text-center cursor-pointer hover:font-semibold'>LOGS</span>
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
                <div className="grid grid-cols-1 grid-rows-2 w-full lg:grid-cols-2 lg:grid-rows-1 justify-center items-center rounded-l-lg bg-gradient-to-r from-black from-10% to-slate-900">
                    <div className="">
                        {event && (
                            <ScanArea
                                inputRef={inputRef}
                                input={input}
                                setInput={setInput}
                                setOutput={setOutput}
                                checkEntry={checkEntry}
                                handleClear={handleClear}
                                eventName={event.name}
                                zone={
                                    event.zones.filter((zone) => zone.id === selectedZone)[0].title
                                }
                            />
                        )}
                    </div>
                    <div className="">
                        {!loading && (
                            <DisplayArea
                                error={error}
                                message={message}
                                output={output}
                                status={status}
                                isCheckingIn={isCheckIn}
                                attempt={attempt}
                                updatedAt={updatedAt}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
