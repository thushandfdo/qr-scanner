import { useEffect, useState } from 'react';
import JSZip from 'jszip';

// local imports
import { qrCodes } from '../../data/data';
import { DownloadButton, EventLayer, FilterButton, QrCode, SearchBox } from '../../components';
import useFetch from '../../hooks/useFetch';

const QrCodes = () => {
    const [zones, setZones] = useState([]);
    const [selectedZone, setSelectedZone] = useState('All');
    const [search, setSearch] = useState('');
    const [tempCodes, setTempCodes] = useState(qrCodes.createdRecords);
    const [eventId, setEventId] = useState(0);

    const { fetchData } = useFetch();

    useEffect(() => {
        setSearch(search);
        setTempCodes(
            qrCodes.createdRecords
                .filter((code) => selectedZone === 'All' || code.zone.toLowerCase() === selectedZone.toLowerCase())
                .filter((code) => code.codeNumber.toString().includes(search.toLowerCase()))
        );
    }, [search, selectedZone]);

    useEffect(() => {
        if (eventId === 0) return;

        const getData = async () => {
            const response = await fetchData(`http://localhost:4002/api/event/getevent/${eventId}`);
            if (response && response.result) {
                const { result } = response;
                const zs = result.zones.map((zone) => zone.type);
                zs.push('All');
                setZones(zs);
            }
        };
        getData();
    }, [eventId, fetchData]);

    const downloadQRs = async () => {
        const zip = new JSZip();

        for (const code of qrCodes.createdRecords) {
            try {
                if (code) {
                    zip.file(`${code.zone}/${code.codeNumber}.png`, code.qrcode.split(';base64,')[1], {
                        base64: true
                    });
                }
            } catch (e) {
                console.log(e.message);
            }
        }

        zip.generateAsync({ type: 'blob' }).then((content) => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = 'qr-codes.zip';
            a.click();
        });
    };

    return (
        <div className="h-screen">
            {eventId === 0 && <EventLayer setEventId={setEventId} />}
            <div className="fixed flex items-center justify-between w-full p-3 bg-white border-b-2 border-b-gray-600">
                <p className="text-lg font-semibold">
                    {selectedZone}: {tempCodes.length} qr-code(s)
                </p>
                <div className="flex justify-end gap-3">
                    <SearchBox search={search} setSearch={setSearch} />
                    {zones.map((z) => (
                        <FilterButton key={z} zone={z} selectedZone={selectedZone} setZone={setSelectedZone} />
                    ))}
                    <DownloadButton onClick={downloadQRs} />
                </div>
            </div>
            <div className="h-[78px]"></div>
            <div className="h-[calc(100%-78px)] flex items-center justify-center">
                {tempCodes.length > 0 ? (
                    <div className="grid w-full max-h-full grid-cols-4 gap-5 mb-auto overflow-y-scroll md:grid-cols-7 lg:grid-cols-10">
                        {tempCodes.map((code) => (
                            <QrCode key={code.id} code={code} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center col-span-full">No QR codes found</p>
                )}
            </div>
        </div>
    );
};

export default QrCodes;
