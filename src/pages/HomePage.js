import React from 'react';
import { Container } from 'atomize';

import Feature from '../components/Feature';
import Bio from '../components/Bio';

const HomePage = () => (
  <Container p={{ y: '40px' }} d="flex" align="center" flexDir="column">
    <Feature />
    <Bio />
  </Container>
);

export default HomePage;
