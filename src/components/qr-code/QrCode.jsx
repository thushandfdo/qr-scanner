const QrCode = ({ code }) => {
    return (
        <div key={code.id} className="flex flex-col items-center">
            <img src={code.qrcode} alt="" className="border-2 border-black" />
            <p>{code.codeNumber}</p>
            <p className="font-semibold">{code.zone}</p>
        </div>
    );
};

export default QrCode;
