import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../layout/LoadingComponent";
import { Activity } from "../../../models/activity";
import { v4 as uuid} from 'uuid';
import { Formik } from "formik";

export default observer (function ActivityForm(){
    const {activityStore} = useStore();
    const {loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    //we are using 'navigate' to route user to list after submitting form.
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    
    //here we are assigning default state when activity is null. We are passing object with empty values
    // const initialState = selectedActivity ?? {
    //     id: '',
    //     title: '',
    //     category: '',
    //     description: '',
    //     date: '',
    //     city: '',
    //     venue: ''
    // }

    useEffect(() => {
        console.log('edit id: ' + id);

        //here we are using 'activity!' because setActivity method do not accept Undefined.
        //and it needs to be typed object so we are forcefully casting it with '!' (Dereferencing operator) 
        //'!' Dereferencing operator is non-null assertion operator and it tells compiler that this expression cannot
        //be null or undefined. In our case here it will be always 'Activity' type object.
        if(id) {
            loadActivity(id).then(activity => {
                setActivity(activity!)
            });
        }
    }, [id, loadActivity]);

    //We are now using 'Formik' so we are commenting this code of manallly submitting form
    // function handleSubmit(){

    //     //if activity.id is not null then update activity else create a new activity
    //     if(!activity.id){
    //         activity.id = uuid();

    //         //create the activity and then navigate to activity details view
    //         createActivity(activity).then(()=> navigate(`/activities/${activity.id}`));
    //     }else {
    //         //update the activity and then navigate to activity details view
    //         updateActivity(activity).then(()=> navigate(`/activities/${activity.id}`));
    //     }
    // }

    ////We are now using 'Formik' so we are commenting this code of manallly submitting form
    // //here we are receiving input changes on any Html Input Elements or Html Text Area Element
    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    //     const {name, value} = event.target;
    //     setActivity({...activity, [name]: value})
    // }

    if(loadingInitial) return <LoadingComponent content = 'Loading activity...'/>

    return(
        <Segment clearing>
            <Formik initialValues={activity} onSubmit={values => console.log(values)}> 
                {({values: activity, handleChange, handleSubmit}) => (                    
                     <Form onSubmit={handleSubmit} autoComplete='off'>
                     <Form.Input placeholder ="Title" value={activity.title} name='title' onChange={handleChange}/>
                         <Form.TextArea placeholder ="Description" value={activity.description} name='description' onChange={handleChange}/>
                         <Form.Input placeholder ="Category" value={activity.category} name='category' onChange={handleChange}/>
                         <Form.Input placeholder ="Date" type='date' value={activity.date} name='date' onChange={handleChange}/>
                         <Form.Input placeholder ="City" value={activity.city} name='city' onChange={handleChange}/>
                         <Form.Input placeholder ="Venue" value={activity.venue} name='venue' onChange={handleChange}/>
                         <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                         <Button as={Link} to='/activities' floated='right' type='button' content='Cancel'/>
                     </Form>
                )}
            </Formik> 
        </Segment>
    )
})