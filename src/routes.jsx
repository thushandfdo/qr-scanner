import { useRoutes } from 'react-router-dom';

// local imports
import {
    Dashboard,
    Home,
    QrCodes,
    Sample,
} from './pages';

const Router = () => {
    return useRoutes([
        {
            path: '*',
            element: <Home />,
        },
        {
            path: '/dashboard',
            element: <Dashboard />
        },
        {
            path: '/qr-codes',
            element: <QrCodes />,
        },
        {
            path: '/sample',
            element: <Sample />,
        }
    ]);
};

export default Router;
