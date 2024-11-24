// local imports
import { icons } from '../../consts';

const SearchBox = ({ search, setSearch }) => {
    return (
        <div className="flex items-center justify-center gap-2 px-3 py-1 border-2 border-black rounded-2xl">
            <img src={icons.search} className="w-4 h-4" alt="" />
            <input
                type="text"
                placeholder="Search by INDEX"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-0 focus:outline-none"
            />
            <img src={icons.clear} className="w-5 h-5 cursor-pointer" alt="" onClick={() => setSearch('')} />
        </div>
    );
};

export default SearchBox;
