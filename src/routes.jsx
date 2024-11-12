import { useRoutes } from 'react-router-dom';

// local imports
import {
    Home,
    Sample,
} from './pages';

const Router = () => {
    return useRoutes([
        {
            path: '*',
            element: <Home />,
        },
        {
            path: '/sample',
            element: <Sample />,
        }
    ]);
};

export default Router;
