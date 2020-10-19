import React from 'react'
import { Row, Col, Container, Text, Anchor } from "atomize";

import heroicChallenges from '../images/heroic-challenges.jpg';
import remarkableInns from '../images/remarkable-inns2.jpg';
import remarkableShops from '../images/remarkable-shops2.jpg';

const PreviousWork = () => {

  return (
    <Container className='previousWorkContainer' p='0'>
      <Text tag="h5" textSize="title">Previous work</Text>

      <Row d='flex' flexDir={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }} justify={{ xs: 'center', sm: 'space-around' }} align='center'>
        <Col size={{ xs: '9', sm: '7', md: '5' }} d='flex' flexDir='column' justify='center'>
          <img src={heroicChallenges} alt='' style={{ width: '100%' }} />
        </Col>
        <Col size={{ xs: '8', sm: '7', md: '5' }} d='flex' flexDir='column' justify='center' p={{ t: '2rem' }} >
          <Text textSize="subheader" >Heroic Challenges</Text>
          <Text textSize="paragraph"><em>Created in collaboration with <Anchor href='https://loresmyth.com/' target="_blank">LoreSmyth</Anchor></em></Text>
          <Text textSize="paragraph">Roleplaying Cards for Players and GMs - Discover hundreds of prompts that encourage creative play, deepen character choices and give rewards that go beyond gold and XP.</Text>
        </Col>
      </Row>

      <Row d='flex' flexDir={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }} justify={{ xs: 'center', sm: 'space-evenly' }} align='center' m={{ y: '4rem' }}>
        <Col size={{ xs: '8', sm: '7', md: '5' }} d='flex' flexDir='column' justify='center' order={{ xs: '2', lg: '1' }} p={{ t: '2rem' }}>
          <Text textAlign='right' textSize="subheader">Remarkable Inns & Their Drinks</Text>
          <Text textAlign='right' textSize="paragraph"><em>Created in collaboration with <Anchor href='https://loresmyth.com/' target="_blank">LoreSmyth</Anchor></em></Text>
          <Text textAlign='right' textSize="paragraph">Best-selling, definitive guide to roleplaying taverns and inns - This richly detailed 88-page tome offers a wealth of new gameplay options, d&d inn maps, 8 ready-made taverns, NPC’s, rumors, secrets and over 1.000 random list options.</Text>
        </Col>
        <Col size={{ xs: '9', sm: '7', md: '5' }} d='flex' flexDir='column' justify='center' align='center' order={{ xs: '1', lg: '2' }} >
          <img src={remarkableInns} alt='' style={{ width: '100%' }} />
        </Col>
      </Row>

      <Row d='flex' flexDir={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }} justify={{ xs: 'center', sm: 'space-around' }} align='center'>
        <Col size={{ xs: '9', sm: '7', md: '5' }} d='flex' flexDir='column' justify='center'>
          <img src={remarkableShops} alt='' style={{ width: '100%' }} />
        </Col>
        <Col size={{ xs: '8', sm: '7', md: '5' }} d='flex' flexDir='column' justify='center' p={{ t: '2rem' }} >
          <Text textSize="subheader" >Remarkable Shops & Their Wares</Text>
          <Text textSize="paragraph"><em>Created in collaboration with <Anchor href='https://loresmyth.com/' target="_blank">LoreSmyth</Anchor></em></Text>
          <Text textSize="paragraph">The Ultimate Guide on Roleplaying Fantasy Shops - From the classic general goods store to wildly exotic locations such as magic item artificers, black markets, underwater libraries, and traveling merchants.</Text>
        </Col>
      </Row>
    </Container>
  )
}

export default PreviousWork
