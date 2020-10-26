import React from "react";
import { Div, Icon, Container } from "atomize";

const Loading = () => {
  return (
    <Container>
      <Div
        bg="transparent"
        d="flex"
        align="center"
        justify="center"
        pos="absolute"
        top="0"
        bottom="0"
        right="0"
        left="0"
        style={{ zIndex: -1 }}
      >
        <Icon name="Loading3" size="4rem" color="gray600" />
      </Div>
    </Container>
  );
};

export default Loading;
