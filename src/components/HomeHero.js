import React from 'react'
import { Container, Div, Button, Text } from 'atomize'
import { Link } from 'react-router-dom'

const HomeHero = () => {

  return (
    <>
      <Container minW='100%' minH='100vh' d="flex" flexDir="column" justify="center" align="center" bg="black" p="2rem">
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <Div d="flex" flexDir="row" justify="center" align="center" w={{ xs: 'auto', md: '300px' }} p={{ b: '30px' }}>
            <img src="https://jvcparry.files.wordpress.com/2020/08/cropped-jvcp-logo-inverted.png" alt="" style={{ maxHeight: '120px' }} />
          </Div>
        </Link>
        <Text tag='h3' textSize='display1' textColor='white'>
          JVC Parry
        </Text>
        <Text tag='h4' textSize='title' textColor='white'>
          Indie TTRPG creator
        </Text>
        <Div className='homeHeroNav' d='flex' flexDir={{ xs: 'column', sm: 'row' }} justify={{ xs: 'center', sm: 'space-around' }} align={{ xs: 'center', sm: 'space-around' }} w={{ xs: '80%', sm: '30%' }} m={{ t: '30px' }}>
          <Link to='/products' style={{ textDecoration: 'none' }}>
            <Button
              textSize="title"
              textColor="white"
              hoverTextColor="warning900"
              bg="black"
              hoverBg="grey600"
              border="1px solid"
              borderColor="white"
              hoverBorderColor="warning900"
              m='1rem'
              w='6em'
            >Products
                        </Button>
          </Link>
          <Link to='/hire-me' style={{ textDecoration: 'none' }}>
            <Button
              textSize="title"
              textColor="white"
              hoverTextColor="warning900"
              bg="black"
              hoverBg="grey600"
              border="1px solid"
              borderColor="white"
              hoverBorderColor="warning900"
              m='1rem'
              w='6em'

            >Hire Me
                        </Button>
          </Link>
          <Link to='/Blog' style={{ textDecoration: 'none' }}>
            <Button
              textSize="title"
              textColor="white"
              hoverTextColor="warning900"
              bg="black"
              hoverBg="grey600"
              border="1px solid"
              borderColor="white"
              hoverBorderColor="warning900"
              m='1rem'
              // p={{ x: '1.5em' }}
              w='6em'
            >Blog
                        </Button>
          </Link>
        </Div>
      </Container>
    </>
  )
}

export default HomeHero
