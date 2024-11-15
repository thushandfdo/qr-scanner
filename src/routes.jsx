import { useRoutes } from 'react-router-dom';

// local imports
import {
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
