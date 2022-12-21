import React from "react";
import { Container, Grid } from "semantic-ui-react";

export default function HomePage() {
    return (
        <Container style={{ marginTop: '7em' }}>
            <Grid>
                <Grid.Row>
                    <h1>Home Page</h1>
                </Grid.Row>
                {/* <Grid.Row>
                    <img src="https://images.pexels.com/photos/245035/pexels-photo-245035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1https://www.tutorialspoint.com/index.htm"></img>
                </Grid.Row> */}
            </Grid>
        </Container>
    )
}