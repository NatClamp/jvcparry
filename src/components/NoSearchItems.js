import React from 'react';
import {
  Text, Row, Col, Container, Anchor, Input, Icon, Button,
} from 'atomize';
import PropTypes from 'prop-types';

const NoProducts = (props) => {
  const {
    searchValue, resetSearch, handleChange, handleSubmit,
  } = props;
  return (
    <>
      <Container>
        <Row d="flex" flexDir={{ xs: 'column', md: 'row' }} justify={{ xs: 'center', md: 'space-around' }} p={{ t: '2rem' }}>
          <Col size={{ xs: '12', md: '5' }}>
            <Text tag="p" textSize="title" p={{ y: { xs: '1rem' } }}>DMsGuild products</Text>
          </Col>
          <Col size={{ xs: '12', md: '2' }} d="flex" justify="center" />
          <Col size={{ xs: '12', md: '5' }} d="flex" flexDir={{ xs: 'column', md: 'row' }} align="center" justify={{ xs: 'center', md: 'flex-end' }}>
            <form style={{ width: '85%' }} onSubmit={handleSubmit}>
              <Input
                placeholder="Search"
                onChange={handleChange}
                value={searchValue}
                suffix={(
                  <Icon
                    name="Search"
                    size="20px"
                    cursor="pointer"
                    onClick={handleSubmit}
                    pos="absolute"
                    top="50%"
                    right="1rem"
                    transform="translateY(-50%)"
                  />
                )}
              />
            </form>
            <Button d="flex" align="center" m={{ x: '1rem' }} p={{ x: '0.75rem' }} onClick={resetSearch} bg="white">
              <Icon name="Close" color="black" size="20px" />
              <Text textSize="caption" textColor="black" p={{ x: '0.5rem' }}>Clear</Text>
            </Button>

          </Col>
        </Row>
        <Row d="flex" flexDir="column" justify="center" align="center" m={{ y: '2rem' }}>
          <Text textSize="title" p="2rem" textAlign="center">
            Sorry, there are no products matching the search term "
            {searchValue}
            "
          </Text>
          <Anchor href="/products/dmsguild">
            <Button
              prefix={(
                <Icon
                  name="Back"
                  size="16px"
                  color="white"
                  m={{ r: '0.5rem' }}
                />
              )}
              shadow="3"
              hoverShadow="4"

            >
              Back to products
            </Button>
          </Anchor>
        </Row>
        <Row p={{ y: '2rem', l: '2rem' }}>
          <Col size={{ xs: '12', md: '7' }} d="flex" align="center" />
          <Col size={{ xs: '12', md: '5' }} d="flex" justify="center" />
        </Row>
      </Container>
    </>
  );
};

NoProducts.propTypes = {
  searchValue: PropTypes.string.isRequired,
  resetSearch: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default NoProducts;
