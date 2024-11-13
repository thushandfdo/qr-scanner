import { useState, useRef } from 'react';

// local imports
import useFetch from '../../hooks/useFetch';

const Sample = () => {
    const inputRef = useRef(null);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const { data, loading, error } = useFetch('http://localhost:4003/scan/check-in');

    const setFocus = () => {
        inputRef.current.focus();
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);

        const groups = input.match(/.{1,3}/g);

        if (groups) {
            groups.pop();
            const asciiString = groups
                .map((group) => String.fromCharCode(parseInt(group, 10)))
                .join('');
            setOutput(asciiString);
        } else {
            setOutput('');
        }
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
    };

    return (
        <div
            className="flex flex-col items-center justify-center w-full h-screen"
            onClick={setFocus}
        >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAAT4SURBVO3BQY4cy5LAQDJQ978yp5e+SiBR0RrpfTezH6x1yWGtiw5rXXRY66LDWhcd1rrosNZFh7UuOqx10WGtiw5rXXRY66LDWhcd1rrosNZFh7Uu+vAllT+pYlJ5UvFE5UnFpDJVPFF5UvFE5U+q+MZhrYsOa110WOuiD5dV3KTyDZUnFZPKk4pJZaqYKp6oTBVPKm5Suemw1kWHtS46rHXRh1+m8kbFGxWTylQxqTypeKPiDZWbVN6o+E2HtS46rHXRYa2LPvzjVJ6ofENlqphU3qj4LzusddFhrYsOa1304R9XMak8qZhUpoonKk8qJpVJZar4LzmsddFhrYsOa1304ZdV/EkVk8qTikllqnhDZaqYVCaVqeKNir/JYa2LDmtddFjrog+XqfxJKlPFGypTxaQyVUwqU8WkMlVMKm+o/M0Oa110WOuiw1oXffhSxX9ZxZOKSWWq+EbFv+Sw1kWHtS46rHXRhy+pTBWTypOKSeWNijdUpopJZar4TRVPVKaKJypTxaTypOIbh7UuOqx10WGtiz78sopJZVJ5UjGpPFGZKr6hMlU8qXhD5RsqU8WkMlVMKjcd1rrosNZFh7Uu+vDLVKaKSWWqmFTeqJhUnlQ8qXhDZap4o+KJylQxqTxRmSpuOqx10WGtiw5rXfThSxWTyjdUpopJ5RsVTyqeqDypmFRuqnhS8YbKVPGNw1oXHda66LDWRfaDi1SmiknlScWk8o2KSWWqeKIyVUwqb1RMKk8qJpWpYlJ5UvGbDmtddFjrosNaF9kPLlJ5UnGTyhsVk8pUMak8qXhDZap4ojJVvKHyRsU3DmtddFjrosNaF324rOIbKm9UTCrfUJkqnqhMFZPKGypTxaQyVUwqU8Wk8psOa110WOuiw1oXfbhMZar4RsUTlTdUnlRMKlPFVPENlTcq/maHtS46rHXRYa2LPnxJ5YnKVPGkYlKZKp5UPFGZKn5TxaTypOKJypOKJxW/6bDWRYe1LjqsdZH94CKVqeL/k8pU8YbKGxVvqEwVT1Smir/JYa2LDmtddFjrog9fUpkqnqg8qZhUpoonKlPFpDJVTCpvVEwqTyqeqEwVU8UTlaliUpkqbjqsddFhrYsOa11kP/hFKlPFpPKk4g2VqWJS+UbFE5Wp4hsqU8UbKm9UfOOw1kWHtS46rHWR/eAilaniDZU3Km5SeaNiUvmbVfymw1oXHda66LDWRfaDf5jKVDGpvFHxhsobFZPKVPGGylTxhspU8Y3DWhcd1rrosNZFH76k8idV/EkqU8UbFZPKGypTxTdUpoqbDmtddFjrosNaF324rOImld9UMam8UfFEZaqYVJ5UvKEyVUwVk8pU8Y3DWhcd1rrosNZFH36ZyhsVb1RMKlPFE5Wp4onKVDGpTBVvqNykMlVMFTcd1rrosNZFh7Uu+vCPU3mi8qRiUpkqnqhMFW9UTCpTxROVqeINlaniG4e1LjqsddFhrYs+/I+pmFTeqJhUJpUnFU8qnqhMFZPKk4rfdFjrosNaFx3Wush+8AWVqeImlaniicobFZPKNyomlTcqfpPKVHHTYa2LDmtddFjrog+XqfxJKlPFE5U3Kv4klaliUpkq/iaHtS46rHXRYa2L7AdrXXJY66LDWhcd1rrosNZFh7UuOqx10WGtiw5rXXRY66LDWhcd1rrosNZFh7UuOqx10WGti/4PWCpiJQ5/EuAAAAAASUVORK5CYII=" alt="" />
            <p className="mb-2 font-semibold">Decoded Data:</p>
            <div className="p-2 text-lg font-semibold border-2 rounded-lg border-slate-600">
                <span className="text-red-500">{output}</span>
            </div>
            <hr className="w-[95%] border-gray-400 my-5" />
            <input
                ref={inputRef}
                type="text"
                className="p-2 m-2 text-center border border-black rounded-lg"
                value={input}
                onChange={(e) => handleChange(e)}
                placeholder="Scan QR Code..."
            />
            <button className="px-4 py-2 text-white rounded-lg bg-slate-800" onClick={handleClear}>
                Clear Input
            </button>
        </div>
    );
};

export default Sample;
