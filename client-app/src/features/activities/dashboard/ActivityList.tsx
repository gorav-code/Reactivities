import React, { Fragment, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItems";


export default function ActivityList() {

    const { activityStore } = useStore();
    const { deleteActivity, activitiesByDate, loading, groupActivities } = activityStore;

    const [target, setTarget] = useState('');

    return (
        <>
            {groupActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    <Segment>
                        <Item.Group divided>
                            {activities.map(activity => (
                                <ActivityListItem activity={activity} />
                            ))}
                        </Item.Group>
                    </Segment>
                </Fragment>
            ))}
        </>

    )
}