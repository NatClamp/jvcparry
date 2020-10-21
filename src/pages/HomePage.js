import React from 'react'
import { Container, Div } from "atomize";

import Feature from '../components/Feature';
import Bio from '../components/Bio';

const HomePage = () => {
    return (
        <Container p={{ y: '40px' }} d='flex' align='center' flexDir='column'>
            <Feature />
            <Div p={{ xs: '20px', sm: '50px' }} />
            <Bio />
        </Container>
    )
}

export default HomePage
