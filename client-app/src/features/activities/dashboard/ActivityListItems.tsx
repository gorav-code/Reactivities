import React, { SyntheticEvent, useState } from 'react';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../models/activity';
import { useStore } from "../../../app/stores/store";
import { Link } from 'react-router-dom';

interface Props {
    activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {

    const { activityStore } = useStore();
    const { deleteActivity, loading } = activityStore;

    const [target, setTarget] = useState('');


    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        // <Item key={activity.id}>
        //     <Item.Content>
        //         <Item.Header as='a'>{activity.title}</Item.Header>
        //         <Item.Meta>{activity.date}</Item.Meta>
        //         <Item.Description>
        //             <div>{activity.description}</div>
        //             <div>{activity.city}, {activity.description}</div>
        //         </Item.Description>
        //         <Item.Extra>
        //             <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color='blue' />
        //             <Button
        //                 name={activity.id}
        //                 loading={loading && target === activity.id} //here we are setting target id so that only that individual button show progress circle 
        //                 onClick={(e) => handleActivityDelete(e, activity.id)}
        //                 floated='right'
        //                 content='Delete'
        //                 color='red' />

        //             <Label basic content={activity.category} />
        //         </Item.Extra>
        //     </Item.Content>
        // </Item>

        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>
                                Hosted by Bob
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/>
                    <Icon name='marker'/>
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment secondary>
                <span>{activity.description}</span>
                <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color='teal' />            </Segment>
        </Segment.Group>
    )
}