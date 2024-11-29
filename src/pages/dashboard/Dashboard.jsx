import { useEffect, useState } from 'react';

// local imports
import { Card, EventLayer } from '../../components';
import useFetch from '../../hooks/useFetch';

const Dashboard = () => {
    const { error, fetchData } = useFetch();

    const [eventId, setEventId] = useState(0);
    const [event, setEvent] = useState(null);

    useEffect(() => {
        if (eventId === 0) return;

        const getData = async () => {
            const response = await fetchData(`https://event.eagleeyelk.com/api/event/getevent/${eventId}`);
            if (response && response.result) {
                const { result } = response;
                const zones = result.zones.map((zone, index) => {
                    return {
                        id: index,
                        title: zone.type,
                        count: zone.count,
                        capacity: zone.limit
                    };
                });
                const date = new Date(result.date);
                setEvent({
                    id: result.id,
                    name: result.title,
                    date: date.toLocaleDateString(),
                    time: date.toLocaleTimeString(),
                    location: result.location,
                    zones
                });
            }
        };
        getData();

        const interval = setInterval(getData, 3000);
        return () => clearInterval(interval);
    }, [eventId, fetchData]);

    return (
        <div className="">
            {eventId === 0 && <EventLayer setEventId={setEventId} />}
            {error ? (
                <div className="flex items-center justify-center p-10">
                    <p>Something went wrong:</p>
                    <div className="text-red-500">{error}</div>
                </div>
            ) : (
                event && (
                    <div className="h-screen">
                        <div className="flex flex-col items-center justify-center gap-2 p-10">
                            <p className="text-3xl font-bold">Event: {event.name}</p>
                            <p className="text-xl">
                                Date: {event.date} - {event.time}
                            </p>
                            <p className="text-xl">Location: {event.location}</p>
                        </div>
                        <div className={`grid grid-cols-[${(event && event.zones) ? event.zones.length : 0}] lg:flex items-center justify-center gap-2 lg:gap-20 p-2 lg:p-10`}>
                            {event.zones.map((zone) => (
                                <Card
                                    key={zone.id}
                                    zone={zone.title}
                                    count={zone.count}
                                    capacity={zone.capacity}
                                />
                            ))}
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default Dashboard;
