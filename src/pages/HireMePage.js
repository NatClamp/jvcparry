import React from 'react';
import {
  Row, Container, Text, Anchor, Col, Div,
} from 'atomize';
import HireMeForm from '../components/HireMeForm';
import PreviousWork from '../components/PreviousWork';

import logo from '../images/logo.png';

const HireMePage = () => (
  <Container className="hireMeContainer">
    <Row p={{ t: { xs: '2rem', sm: '4rem' }, x: { xs: '2rem', sm: '0' } }} d="flex" flexDir={{ xs: 'column', sm: 'row' }}>
      <Col size={{ xs: '12', sm: '8' }}>
        <Text tag="h4" textSize="display1" p={{ b: '1rem' }} w="100%">Freelance work</Text>
        <Text tag="p" textSize={{ xs: 'paragraph', sm: 'subheader' }} p={{ y: '0.5rem' }}>
          My typical role as a freelancer is as a TTRPG designer, author, and consultant.
          Much of my work is for large 3rd party publishers such as Wizards of the Coast, LoreSmyth,
          Nord Games, and Jetpack7, though I accept private commissions too!
        </Text>
        <Text tag="p" textSize={{ xs: 'paragraph', sm: 'subheader' }} p={{ y: '0.5rem' }}>
          I'm a deadline specialist and fluent in 5e SRD compliant material, though have been hired
          to write wargaming content, short fiction, educational content, and dialogue for video
          games too. The content I create and publish myself varies from indie RPGs to material
          for existing systems, and can be found on this site, and a number of other platforms
          (DMsGuild, DTRPG, Kickstarter, and itch.io).
        </Text>
        <Text tag="p" textSize={{ xs: 'paragraph', sm: 'subheader' }} p={{ y: '0.5rem' }}>
          My rates vary on what you're looking for. Rates start at £0.10 per word for writing,
          and £20 per hour for editing, consultancy, and other design.
        </Text>
        <Text tag="p" textSize={{ xs: 'paragraph', sm: 'subheader' }} p={{ y: '0.5rem' }}>
          If you'd like to discuss a project,
          {' '}
          <Anchor d="inline-block" href="#hire-form"> get in touch</Anchor>
          !
        </Text>
      </Col>
      <Col size={{ xs: '12', sm: '4' }} p={{ y: { xs: '2rem' } }} d="flex" justify="center" align="center">
        <img src={logo} alt="JVC Parry logo" style={{ maxHeight: '200px' }} />
      </Col>
    </Row>
    <Row p={{ y: { xs: '2rem' }, x: { xs: '2rem', md: '0' } }}>
      <PreviousWork />
    </Row>
    <Row>
      <Div p={{ y: { xs: '2rem', sm: '4rem' }, x: { xs: '2rem' } }} w="100%">
        <Text tag="h5" textSize="display1" p={{ b: '1rem' }} id="hire-form">Get in touch</Text>
        <HireMeForm id="hire-form" />
      </Div>
    </Row>
  </Container>
);

export default HireMePage;
