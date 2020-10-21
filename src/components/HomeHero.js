import React from 'react'
import { Container, Div, Button, Text } from 'atomize'
import { Link } from 'react-router-dom'

// import bg from '../images/bg.jpg';
import bg from '../images/bg-min.jpg';
import logoInverted from '../images/logo-inverted.png'

const HomeHero = () => {

  return (
    <>
      <Container minW='100%' minH='100vh' d="flex" flexDir="column" justify="center" align="center" bg="black" p="2rem" bgImg={bg} bgSize="cover"
        bgPos="center">
        <Div d="flex" flexDir="row" justify="center" align="center" w={{ xs: 'auto', md: '300px' }} p={{ b: '30px' }}>
          <img src={logoInverted} alt="" style={{ maxHeight: '120px' }} />
        </Div>
        <Text tag='h3' textSize='display1' textColor='white'>
          JVC Parry
        </Text>
        <Text tag='h4' textSize='title' textColor='white'>
          Indie TTRPG creator
        </Text>
        <Div className='homeHeroNav' d='flex' flexDir={{ xs: 'column', sm: 'row' }} justify={{ xs: 'center', sm: 'space-around' }} align={{ xs: 'center', sm: 'space-around' }} w={{ xs: '80%', sm: '30%' }} m={{ t: '30px' }}>
          <Link to='/products' style={{ textDecoration: 'none' }}>
            <Button
              textSize="subheader"
              hoverTextColor="gray200"
              TextColor="gray300"
              hoverBg="hsla(217, 14%, 43%)"
              bg="hsla(217, 14%, 50%)"
              m='1rem'
              w='10em'
            >Products
                        </Button>
          </Link>
          <Link to='/hire-me' style={{ textDecoration: 'none' }}>
            <Button
              textSize="subheader"
              hoverTextColor="gray200"
              TextColor="gray300"
              hoverBg="hsla(217, 14%, 43%)"
              bg="hsla(217, 14%, 50%)"
              m='1rem'
              w='10em'

            >Hire Me
                        </Button>
          </Link>
          {/* <Link to='/Blog' style={{ textDecoration: 'none' }}>
            <Button
              textSize="subheader"
              hoverTextColor="gray200"
              TextColor="gray300"
              hoverBg="hsla(217, 14%, 43%)"
              bg="hsla(217, 14%, 50%)"
              m='1rem'
              w='10em'
            >Blog
                        </Button>
          </Link> */}
        </Div>
      </Container>
    </>
  )
}

export default HomeHero
