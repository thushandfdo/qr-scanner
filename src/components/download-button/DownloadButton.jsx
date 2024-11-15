// local imports
import { icons } from '../../consts';

const DownloadButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center gap-2 px-4 py-1 rounded-2xl ring-2 ring-black">
            <img src={icons.download} alt="download" className="w-4 h-4" />
            <span className="hover:font-semibold">Download</span>
        </button>
    );
};

export default DownloadButton;
