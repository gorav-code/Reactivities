import {createBrowserRouter, RouteObject} from 'react-router-dom';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityForm from '../../features/activities/form/ActivityForm';
import TestErrors from '../../features/errors/TestError';

import App from '../../layout/App';
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children:[
            //to show all activities on dashboard route
            {path: 'activities', element:<ActivityDashboard/>}, 

            //select a single activity on route    
            {path: 'activities/:id', element:<ActivityDetails/>}, 

            //create new activity route
            //Here we must specify 'key' because we are using same 'ActivityForm' element for both Create and Edit/Update/Manage
            {path: 'createactivity', element:<ActivityForm key='create'/>},  
            
            //edit/update existing activity
            //Here we must specify 'key' because we are using same 'ActivityForm' element for both Create and Edit/Update/Manage
            {path: 'manage/:id', element:<ActivityForm key='manage'/>},

            {path: 'errors', element:<TestErrors/>},
        ]
    }
]
export const router = createBrowserRouter(routes);