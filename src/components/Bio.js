import React from 'react'
import { Row, Col, Container, Text, Button, Div } from "atomize";
import portrait from '../images/portrait.jpg';
import { Link } from 'react-router-dom'


const Bio = () => {

  return (
    <Container className='bioContainer'>
      <Row d='flex' flexDir={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }} justify={{ xs: 'center', sm: 'space-around' }} align='center'>
        <Col size={{ xs: '10', sm: '7' }} d='flex' flexDir='column' justify='center'>
          <Div m={{ y: '20px' }}>
            <Text textSize="heading" textAlign="right">Greetings!</Text>
            <Text textSize={{ xs: 'paragraph', sm: 'subheader' }} textAlign="right" p={{ b: '10px' }}>I'm Joshua (JVC) Parry [he/him]. </Text>
            <Text textSize={{ xs: 'paragraph', sm: 'subheader' }} textAlign="right" p={{ b: '10px' }}>I'm a designer, author, and publisher of TTRPG material based in the UK. I'm a freelancer in numerous capacities, but primarily as an author of TTRPG material. Much of my work is for large companies such as LoreSmyth and Nord Games, though I work for private commission too. </Text>
            <Text textSize={{ xs: 'paragraph', sm: 'subheader' }} textAlign="right">My formal education is in Biosciences and Zoology, and in my spare time I like to play games (obviously), ramble, write, fish, play in bands, and eat fine food!</Text>
          </Div>
          <Div d="flex" justify='flex-end' m={{ b: '20px' }}>
            <Link to='/hire-me' style={{ textDecoration: 'none' }}>
              <Button
                d="inline-block"
                h="2.5rem"
                p={{ x: "1rem" }}
                textSize="body"
                textColor="black700"
                bg="gray100"
                hoverBg="gray300"
                border="1px solid"
                borderColor="black700"
                hoverBorderColor="black900"
                shadow='2'
                hoverShadow='3'
                m={{ t: '1rem', r: '0' }}
              >Hire me</Button>
            </Link>
          </Div>
        </Col>
        <Col size={{ xs: '10', sm: '4' }} >
          <img src={portrait} alt='' style={{ width: '100% ' }} />
        </Col>
      </Row>
    </Container >
  )
}

export default Bio
