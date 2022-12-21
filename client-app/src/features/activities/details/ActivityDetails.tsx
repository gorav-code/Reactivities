import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../layout/LoadingComponent";
 

export default observer(function ActivityDetails() { 
    const {activityStore} = useStore();
    
    //here we are creating reference variable 'activity' from selectedActivity object and 
    //selectedActivity object is property in activityStore
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore; 

    
    //we are using below property to accept id of any activity directly and 
    //'useParams' is hook from React Router and read 
    //then setting it through useEffect once it is rendered
    //const {id} = useParams<{id: string}>();
    const {id} = useParams();

    useEffect(() => {
        console.log('useEffect: ' + id  );
        if(id){
            loadActivity(id);
        }
    }, [id, loadActivity]); //here 'id and loadActivity' we are inserting as depedency.
    
    //here we are checking if activity is undefined then return from here and return a LoadingComponent
    if(loadingInitial || !activity) return <LoadingComponent/>;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button as={Link} to={`/manage/${activity.id}`} basic color='blue' content='Edit'/>
                    <Button as={Link} to='/activities' basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
})