import React from 'react'
import { Row, Col, Container, Text, Anchor, Button, Div } from "atomize";
import portrait from '../images/portrait.jpg';


const Bio = () => {

  return (
    <Container className='featureContainer'>
      <Row d='flex' flexDir={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }} justify={{ xs: 'center', sm: 'space-around' }} align='center'>
        <Col size={{ xs: '10', sm: '7' }} d='flex' flexDir='column' justify='center'>
          <Div m={{ y: '20px' }}>
            <Text textSize="heading" textAlign="right">Greetings!</Text>
            <Text textSize={{ xs: 'paragraph', sm: 'subheader' }} textAlign="right" p={{ b: '10px' }}>I'm Joshua (JVC) Parry [he/him]. </Text>
            <Text textSize={{ xs: 'paragraph', sm: 'subheader' }} textAlign="right" p={{ b: '10px' }}>I'm a designer, author, and publisher of TTRPG material based in the UK. I'm a freelancer in numerous capacities, but primarily as an author of TTRPG material. Much of my work is for large companies such as LoreSmyth and Nord Games, though I work for private commission too. </Text>
            <Text textSize={{ xs: 'paragraph', sm: 'subheader' }} textAlign="right">My formal education is in Biosciences and Zoology, and in my spare time I like to play games (obviously), ramble, write, fish, play in bands, and eat fine food!</Text>
          </Div>
          <Div d="flex" justify='flex-end' m={{ b: '20px' }}>
            <Anchor href="/hire-me" textDecoration='none' w='100px' m='0'>
              <Button
                d='inline-block'
                r='0'
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
              >Hire me</Button>
            </Anchor>
          </Div>

        </Col>
        <Col size={{ xs: '10', sm: '4' }} >
          <img src={portrait} alt='' style={{ maxHeight: '300px' }} />
        </Col>
      </Row>
    </Container>
  )
}

export default Bio
