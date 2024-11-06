import { useState } from 'react';
import './App.css';

function App() {
    const [val, setVal] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;

        const groups = value.match(/.{1,3}/g); // Regex to split into groups of 3

        console.log(groups);
        if (groups) {
            // Convert each group to an ASCII character
            const asciiString = groups
                .map((_) => String.fromCharCode(parseInt(groups, 10)))
                .join('');
            setVal(asciiString);
        } else {
            setVal('');
        }
    };

    return (
        <div className="qr-reader">
            {JSON.stringify(val)}
            <input type="text" name="" id="" value={val} onChange={handleChange} />
        </div>
    );
}

export default App;
