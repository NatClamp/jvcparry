import React from 'react'
import { Row, Col, Div, Text, Anchor } from "atomize";

import heroicChallenges from '../images/heroic-challenges.jpg';
import remarkableInns from '../images/remarkable-inns2.jpg';
import remarkableShops from '../images/remarkable-shops2.jpg';

const PreviousWork = () => {

  return (
    <Div className='previousWorkContainer'>
      <Text tag="h5" textSize="display1">Previous work</Text>

      <Row d='flex' flexDir={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }} justify={{ xs: 'center', sm: 'space-around' }} align='center'>
        <Col size={{ xs: '12', sm: '7', md: '5' }} d='flex' flexDir='column' justify='center' p={{ y: { xs: "2rem" } }}>
          <img src={heroicChallenges} alt='Heroic Challenges game' style={{ width: '100%' }} />
        </Col>
        <Col size={{ xs: '12', sm: '7', md: '5' }} d='flex' flexDir='column' justify='center' p={{ t: '2rem' }} >
          <Text textAlign={{ xs: 'center', md: 'left' }} textSize={{ xs: 'subheader', sm: 'title' }} >Heroic Challenges</Text>
          <Text textAlign={{ xs: 'center', md: 'left' }} textSize={{ xs: 'paragraph', sm: 'subheader' }}><em>Created in collaboration with <Anchor href='https://loresmyth.com/' target="_blank">LoreSmyth</Anchor></em></Text>
          <Text textAlign={{ xs: 'center', md: 'left' }} textSize={{ xs: 'paragraph', sm: 'subheader' }}>Roleplaying Cards for Players and GMs - Discover hundreds of prompts that encourage creative play, deepen character choices and give rewards that go beyond gold and XP.</Text>
        </Col>
      </Row>

      <Row d='flex' flexDir={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }} justify={{ xs: 'center', sm: 'space-evenly' }} align='center' m={{ y: '4rem' }}>
        <Col size={{ xs: '12', sm: '7', md: '5' }} d='flex' flexDir='column' justify='center' order={{ xs: '2', lg: '1' }} p={{ t: '2rem' }}>
          <Text textAlign={{ xs: 'center', md: 'right' }} textSize={{ xs: 'subheader', sm: 'title' }}>Remarkable Inns & Their Drinks</Text>
          <Text textAlign={{ xs: 'center', md: 'right' }} textSize={{ xs: 'paragraph', sm: 'subheader' }}><em>Created in collaboration with <Anchor href='https://loresmyth.com/' target="_blank">LoreSmyth</Anchor></em></Text>
          <Text textAlign={{ xs: 'center', md: 'right' }} textSize={{ xs: 'paragraph', sm: 'subheader' }}>Best-selling, definitive guide to roleplaying taverns and inns - This richly detailed 88-page tome offers a wealth of new gameplay options, d&d inn maps, 8 ready-made taverns, NPC’s, rumors, secrets and over 1.000 random list options.</Text>
        </Col>
        <Col size={{ xs: '12', sm: '7', md: '5' }} d='flex' flexDir='column' justify='center' align='center' order={{ xs: '1', lg: '2' }} >
          <img src={remarkableInns} alt='Remarkable Inns guide' style={{ width: '100%' }} />
        </Col>
      </Row>

      <Row d='flex' flexDir={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }} justify={{ xs: 'center', sm: 'space-around' }} align='center'>
        <Col size={{ xs: '12', sm: '7', md: '5' }} d='flex' flexDir='column' justify='center'>
          <img src={remarkableShops} alt='Remarkable Shops guide' style={{ width: '100%' }} />
        </Col>
        <Col size={{ xs: '12', sm: '7', md: '5' }} d='flex' flexDir='column' justify='center' p={{ t: '2rem' }} >
          <Text textAlign={{ xs: 'center', md: 'left' }} textSize={{ xs: 'subheader', sm: 'title' }} >Remarkable Shops & Their Wares</Text>
          <Text textAlign={{ xs: 'center', md: 'left' }} textSize={{ xs: 'paragraph', sm: 'subheader' }}><em>Created in collaboration with <Anchor href='https://loresmyth.com/' target="_blank">LoreSmyth</Anchor></em></Text>
          <Text textAlign={{ xs: 'center', md: 'left' }} textSize={{ xs: 'paragraph', sm: 'subheader' }}>The Ultimate Guide on Roleplaying Fantasy Shops - From the classic general goods store to wildly exotic locations such as magic item artificers, black markets, underwater libraries, and traveling merchants.</Text>
        </Col>
      </Row>
    </Div>
  )
}

export default PreviousWork
