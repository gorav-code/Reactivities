import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function HomePage() {

    const { userStore } = useStore();

    return (
        // <Container style={{ marginTop: '7em' }}>
        //     <h1>Home Page</h1>
        //     <h3>Go to <Link to='/activities'>Activities</Link></h3>
        // </Container>
        <Segment inverted textAlign='center' classname='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' style={{ marginBottom: 12 }} />
                    Reactivities
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to Reactivities' />
                        <Button as={Link} to='/login' size='huge' inverted>
                            Go to Activities!
                        </Button>
                    </>
                ) : (
                    <Button as={Link} to='/login' size='huge' inverted>
                        Login
                    </Button>
                )}
            </Container>
        </Segment>
    )
})