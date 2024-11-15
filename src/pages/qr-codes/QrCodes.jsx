import { useEffect, useState } from 'react';
import JSZip from 'jszip';

// local imports
import { qrCodes } from '../../data/data';
import { DownloadButton, FilterButton, QrCode, SearchBox } from '../../components';

const QrCodes = ({ zones = ["VIP", "Regulur"] }) => {
    zones.push('All');
    const [zone, setZone] = useState('All');
    const [search, setSearch] = useState('');
    const [tempCodes, setTempCodes] = useState(qrCodes.createdRecords);

    useEffect(() => {
        setSearch(search);
        setTempCodes(
            qrCodes.createdRecords
                .filter((code) => zone === 'All' || code.zone.toLowerCase() === zone.toLowerCase())
                .filter((code) => code.id.toString().includes(search.toLowerCase()))
        );
    }, [search, zone]);

    const downloadQRs = async () => {
        const zip = new JSZip();

        for (const code of qrCodes.createdRecords) {
            try {
                if (code) {
                    zip.file(`${code.zone}/${code.id}.png`, code.qrcode.split(';base64,')[1], {
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
            <div className="fixed flex items-center justify-between w-full p-3 bg-white border-b-2 border-b-gray-600">
                <p className="text-lg font-semibold">
                    {zone}: {tempCodes.length} qr-code(s)
                </p>
                <div className="flex justify-end gap-3">
                    <SearchBox search={search} setSearch={setSearch} />
                    {zones.map((z) => (
                        <FilterButton key={z} zone={z} selectedZone={zone} setZone={setZone} />
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
