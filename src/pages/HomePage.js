import React from 'react'
import { Row, Container, Div } from "atomize";

import Feature from '../components/Feature';
import Bio from '../components/Bio';

const HomePage = () => {

    return (
        <Container p={{ y: '40px' }}>
            <Feature />
            <Div p={{ xs: '20px', sm: '50px' }} />
            <Bio />
        </Container>
    )
}

export default HomePage
