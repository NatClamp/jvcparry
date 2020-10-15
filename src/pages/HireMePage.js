import React from 'react'
import { Row, Container, Text, Anchor, Input } from "atomize";
import HireMeForm from '../components/HireMeForm';

const HireMePage = () => {

  return (
    <Container>
      <Row p={{ t: { xs: '2rem', sm: '4rem' }, x: { xs: '2rem', sm: '0' } }}>
        <Text tag="h4" textSize="heading" p={{ b: '1rem' }}>Hire Me</Text>
        <Text tag="p" textSize="paragraph">
          Primarily I freelance as a TTRPG designer, author, and consultant. Much of my work is for large companies such as LoreSmyth and Nord Games, though I work for private commission too!
        </Text>
        <Text tag="p" textSize="paragraph">
          I'm a specialist at tight deadlines and 5e SRD compliant material, though have been hired to write wargaming content, short fiction, educational content, and dialogue for video games too. The content I create and publish myself varies from indie RPGs to existing system material, and can be found on this site, and a number of other platforms (DMsGuild, DTRPG, Kickstarter, and itch.io).
        </Text>
        <Text tag="p" textSize="paragraph">
          My rates vary on what you're looking for. Rates start at $0.10 per word for writing, and $5 per page for editing, consultancy and layout.
        </Text>
        <Text tag="p" textSize="paragraph">If you'd like to discuss a project, <Anchor d="inline-block" href="#hire-form">get in touch</Anchor>!</Text>
      </Row>
      <Row p={{ y: { xs: '2rem', sm: '4rem' }, x: { xs: '2rem', sm: '0' } }}>
        <Text tag="h5" textSize="title">Previous work</Text>
      </Row>
      <Row p={{ y: { xs: '2rem', sm: '4rem' }, x: { xs: '2rem', sm: '0' } }}>
        <HireMeForm />
      </Row>
    </Container>
  )
}

export default HireMePage
