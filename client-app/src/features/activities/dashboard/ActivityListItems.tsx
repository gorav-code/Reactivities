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
                    <Icon name='clock' /> {activity.date}
                    <Icon name='marker' /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>

            {/* here we are using clearing flag because this entire segment will be repeated in list so we need to clear previous item floating content  */}
            <Segment clearing>
                <span>{activity.description}</span>
                <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color='teal'/>
            </Segment>
        </Segment.Group>
    )
}