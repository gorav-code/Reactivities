import {createBrowserRouter, Navigate, RouteObject} from 'react-router-dom';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ActivityForm from '../../features/activities/form/ActivityForm';
import TestErrors from '../../features/errors/TestError';
import LoginForm from '../../features/users/LoginForm';

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
            
            //edit/update existing actvity
            //Here we must specify 'key' because we are using same 'ActivityForm' element for both Create and Edit/Update/Manage
            {path: 'manage/:id', element:<ActivityForm key='manage'/>},

            {path: 'login', element:<LoginForm/>},

            {path: 'errors', element:<TestErrors/>},
            {path: 'not-found', element:<TestErrors/>},
            {path: 'server-error', element:<TestErrors/>},
            {path: 'server-error', element:<TestErrors/>},
            {path: '*', element:<Navigate replace to='/not-found'/>},
        ]
    }
]
export const router = createBrowserRouter(routes);