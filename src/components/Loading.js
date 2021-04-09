import React from 'react';
import { Div, Icon, Container } from 'atomize';

const Loading = () => (
  <Container data-testid="loading">
    <Div
      bg="transparent"
      d="flex"
      align="center"
      justify="center"
      minH="70vh"
    >
      <Icon name="Loading3" size="4rem" color="gray600" />
    </Div>
  </Container>
);

export default Loading;
