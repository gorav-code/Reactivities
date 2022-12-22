import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../layout/LoadingComponent"; 
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const {loadActivitites, activityRegistry} = activityStore;
 
    //making get request
    useEffect(() => {
        //checking if we do have activities only then we will load activities 
        //Here we have to check 'activityRegistry.size <= 1' because if user directly opens an activity from browser
        //then we only have 
        if(activityRegistry.size <= 1 ){
            activityStore.loadActivitites();
        }
        
    }, [loadActivitites, activityRegistry.size, activityStore]); //here we are passing activityStore as depedency

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />


    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters/>
            </Grid.Column>
        </Grid>
    );
}
)