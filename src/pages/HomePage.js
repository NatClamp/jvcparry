import React from 'react'
import { Container, Div } from "atomize";

import Feature from '../components/Feature';
import Bio from '../components/Bio';

const HomePage = () => {
    return (
        <Container p={{ y: '40px' }} d='flex' align='center' flexDir='column'>
            <Feature />
            <Bio />
        </Container>
    )
}

export default HomePage
