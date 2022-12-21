import {createBrowserRouter, RouteObject} from 'react-router-dom';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityForm from '../../features/activities/form/ActivityForm';
import HomePage from '../../features/home/homepage';

import App from '../../layout/App';
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children:[
            {path: '', element:<HomePage/>},
            {path: 'activities', element:<ActivityDashboard/>},     //for all acivities
            {path: 'activities/:id', element:<ActivityDetails/>},   //Selects one activity
            {path: 'createactivity', element:<ActivityForm/>},      //Open form to Create New Actvity 
            {path: 'manage/:id', element:<ActivityForm/>},          //Open form to Edit Activity
        ]
    }
]
export const router = createBrowserRouter(routes);