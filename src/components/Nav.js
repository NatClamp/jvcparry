import React from 'react';
import { Div, Button } from 'atomize';
import { Link } from 'react-router-dom';

const Nav = () => (
  <>
    <Div d={{ xs: 'none', md: 'flex' }} flexDir="row" justify="space-around" align="center" w={{ xs: 'auto', md: '300px' }} data-testid="nav-container">
      <Link to="/products" style={{ textDecoration: 'none' }}>
        <Button
          h="2.5rem"
          p={{ x: '1rem' }}
          textSize="body"
          textColor="white"
          bg="black"
          border="1px solid"
          borderColor="white"
          hoverTextColor="gray500"
          hoverBorderColor="gray500"
          m={{ r: '0.5rem' }}
        >
          Products
        </Button>
      </Link>
      <Link to="/hire-me" style={{ textDecoration: 'none' }}>
        <Button
          h="2.5rem"
          p={{ x: '1rem' }}
          textSize="body"
          textColor="white"
          bg="black"
          border="1px solid"
          borderColor="white"
          hoverTextColor="gray500"
          hoverBorderColor="gray500"
          m={{ r: '0.5rem' }}
        >
          Hire Me
        </Button>
      </Link>
      <Link to="/blog" style={{ textDecoration: 'none' }}>
        <Button
          h="2.5rem"
          p={{ x: '1rem' }}
          textSize="body"
          textColor="white"
          bg="black"
          border="1px solid"
          borderColor="white"
          hoverTextColor="gray500"
          hoverBorderColor="gray500"
          m={{ r: '0.5rem' }}
        >
          Blog
        </Button>
      </Link>
    </Div>
  </>
);

export default Nav;
