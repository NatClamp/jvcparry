import React from 'react'
import { Row, Col, Container, Text, Anchor, Button, Div } from "atomize";


const HomePage = () => {

  return (
    <Container className='featureContainer'>
      <Row d='flex' flexDir={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }} justify='center' align='center'>
        <Col size={{ xs: '10', sm: '4' }} >
          <img src='https://jvcparry.files.wordpress.com/2020/07/cover.jpg' alt='' style={{ maxHeight: '400px' }} />
        </Col>
        <Col size={{ xs: '10', sm: '6' }} d='flex' flexDir='column' justify='center'>
          <Div m={{ t: '10px' }}>
            <Text textSize="heading" >Call from the Deep</Text>
            <Text textSize="title"><em>Assault from the Astral</em></Text>
            <Text textSize="subheader">After crash-landing onto the Material Plane, a strange, otherworldly ship brings with it an unexpected wave of piracy, hideous creatures from the bottom of the Trackless Sea, and a notorious foe who has been awakened from the deep, intent on destroying the world as you know it.</Text>
            <Anchor href="" style={{ textDecoration: 'none', color: 'white' }}>
              <Button
                h="2.5rem"
                p={{ x: "1rem" }}
                textSize="body"
                textColor="black"
                hoverTextColor="warning900"
                bg="white"
                hoverBg="grey600"
                border="1px solid"
                borderColor="black"
                hoverBorderColor="warning900"
                m={{ y: '1rem' }}
              >Buy on DMsGuild</Button>
            </Anchor>
          </Div>
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
