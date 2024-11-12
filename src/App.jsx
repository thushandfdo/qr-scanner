import { BrowserRouter } from 'react-router-dom';

// local imports
import Router from './routes';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    );
}

export default App;
