import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../layout/LoadingComponent";
import { Activity } from "../../../models/activity";
import { Formik } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectList from "../../../app/common/form/MySelectList";
import { categoryOptions } from "../../../app/common/form/options/categoryOptions";
import MyDatePicker from "../../../app/common/form/MyDatePicker";
import { v4 as uuid } from "uuid";

export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { loading, loadActivity, loadingInitial, createActivity, updateActivity } = activityStore;
    const { id } = useParams<{ id: string }>();

    //we are using 'navigate' to route user to list after submitting form.
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    //we are using this validationSchema from Yup to apply validations for Formik form
    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required.'),
        description: Yup.string().required('The activity description is required.'),
        category: Yup.string().required(), //if we do not want to give custom error msg then we leave it empty and it will show default msg.
        date: Yup.string().required('Date is required.').nullable(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
    })

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
         
        //here we are using 'activity!' because setActivity method do not accept Undefined.
        //and it needs to be typed object so we are forcefully casting it with '!' (Dereferencing operator) 
        //'!' Dereferencing operator is non-null assertion operator and it tells compiler that this expression cannot
        //be null or undefined. In our case here it will be always 'Activity' type object.
        if (id) {
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

    function handleFormSubmit(activity: Activity) {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }

            createActivity(newActivity).then(() => navigate(`/activities/${activity.id}`));
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    }

    ////We are now using 'Formik' so we are commenting this code of manallly submitting form
    // //here we are receiving input changes on any Html Input Elements or Html Text Area Element
    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    //     const {name, value} = event.target;
    //     setActivity({...activity, [name]: value})
    // }

    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return (
        <Segment clearing>
            {/* here we are using 'enableReinitialize' and this reloads form values if initial values changes
                otherwise upon 'edit' feature we will not be able to see data of selected actvitity
            */}
            <Header content='Activity Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>

                        {/* using default formik 'Field' */}
                        {/* <Field placeholder ="Title"  name='title'/> */}

                        {/* using default formik 'Field' */}
                        <MyTextInput name="title" placeholder="Title" />
                        <MyTextArea placeholder="Description" name='description' rows={3} />
                        <MySelectList placeholder="Category" name='category' options={categoryOptions} />
                        <MyDatePicker
                            name='date'
                            placeholderText='Date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />

                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeholder="City" name='city' />
                        <MyTextInput placeholder="Venue" name='venue' />
                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})
