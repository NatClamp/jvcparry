import React from 'react';
import { Container, Text, Button } from 'atomize';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <Container d="flex" align="center" flexDir="column" justify="center" minH="68vh">
    <Text tag="h2" textSize="display3" p={{ t: '0.5rem' }}>404</Text>
    <Text tag="h2" textSize="display1">Sorry, this page couldn't be found</Text>
    <Link to="/" style={{ textDecoration: 'none' }}>
      <Button
        d="inline-block"
        h="2.5rem"
        p={{ x: '1rem' }}
        textSize="body"
        textColor="black700"
        bg="gray100"
        hoverBg="gray300"
        border="1px solid"
        borderColor="black700"
        hoverBorderColor="black900"
        shadow="2"
        hoverShadow="3"
        m={{ t: '1rem', r: '0' }}
      >
        Return home
      </Button>
    </Link>
  </Container>
);

export default HomePage;
