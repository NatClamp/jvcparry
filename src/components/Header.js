import React, { useContext, useState } from 'react';
import {
  Container, Anchor, Icon, Div, Text,
} from 'atomize';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/shopContext';

import Nav from './Nav';
import MobileNav from './MobileNav';

const Header = () => {
  const { openCart } = useContext(ShopContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <Container minW="100%" d="flex" flexDir="row" justify="space-between" align="center" bg="black" p="2rem">
        <Nav />
        <Text onClick={() => toggleMenu()} cursor="pointer" d={{ xs: 'flex', md: 'none' }}>{mobileMenuOpen ? <Icon name="Cross" size="20px" color="gray400" /> : <Icon name="Menu" size="20px" color="gray400" />}</Text>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <Div d="flex" flexDir="row" justify="center" align="center" w={{ xs: 'auto', md: '300px' }}>
            <img src="https://jvcparry.files.wordpress.com/2020/08/cropped-jvcp-logo-inverted.png" alt="JVC Parry logo" style={{ maxHeight: '60px' }} />
          </Div>
        </Link>
        <Anchor onClick={() => openCart()} w={{ xs: 'auto', md: '300px' }} d="flex" justify="flex-end" cursor="pointer"><Icon name="Bag" size="20px" color="gray400" /></Anchor>
      </Container>
      {mobileMenuOpen && <MobileNav toggleMenu={toggleMenu} />}
    </>
  );
};

export default Header;
