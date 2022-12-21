import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../layout/LoadingComponent"; 
import ActivityList from "./ActivityList";

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();

    //extracting two properties from activityStore obj just like we create reference variables
    const { selectedActivity, editMode } = activityStore;

    //making get request
    useEffect(() => {
        activityStore.loadActivitites();
    }, [activityStore]); //here we are passing activityStore as depedency

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />


    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h3>Activity Filter</h3>
                {/* {selectedActivity && !editMode &&
                    <ActivityDetails />}
                {editMode &&
                    <ActivityForm />} */}
            </Grid.Column>
        </Grid>
    );
}
)