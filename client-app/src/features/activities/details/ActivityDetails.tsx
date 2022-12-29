import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../layout/LoadingComponent";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
 

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
         <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar/>
            </Grid.Column>
         </Grid>
    )
})