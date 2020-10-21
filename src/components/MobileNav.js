import React from 'react'
import { Container, Row } from 'atomize'
import { Link } from 'react-router-dom'

const MobileNav = () => {

  return (
    <>
      <Container d="flex" flexDir="column" p="0" m='0' bg="black" minW='100%'>
        <ul style={{ listStyle: 'none', margin: '0 auto', padding: '0', paddingBottom: '20px' }}>
          <Row p="1rem" d="flex" justify="center">
            <li><Link to='/products' style={{ textDecoration: 'none', color: 'white' }}>Products</Link></li>
          </Row>
          <Row p="1rem" d="flex" justify="center">
            <li><Link to='/hire-me' style={{ textDecoration: 'none', color: 'white' }}>Hire Me</Link></li>
          </Row>
          {/* <Row p="1rem" d="flex" justify="center">
            <li><Link to='/blog' style={{ textDecoration: 'none', color: 'white' }}>Blog</Link></li>
          </Row> */}
        </ul>
      </Container>
    </>
  )
}

export default MobileNav