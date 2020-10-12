import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faDAndD, faPatreon } from '@fortawesome/free-brands-svg-icons';
import { Container, Text, Anchor, Icon, Div } from 'atomize'

import NewsletterForm from './NewsletterForm';

const Footer = () => {

  const currentYear = new Date(Date.now()).toLocaleDateString('en-gb', { year: 'numeric' });

  return (
    <>
      <Container className='Footer' d='flex' flexDir={{ sm: 'column', md: 'row' }} justify='space-around' align='center' minW='100%' overflow="hidden" p='20px 0' bg='black'>
        <Div className='FooterRight' w={{ xs: '100%', sm: '30%' }} d='flex' flexDir='column' justify='center' align='flex-start'>
          <Div d='flex' w='100%' justify='space-evenly' align={{ xs: 'center' }} textSize='1.5em' m={{ t: { xs: '20px', md: '10px' }, b: '0', l: '0', r: '0' }}>
            <Anchor href="https://twitter.com/jvcparry" style={{ textDecoration: 'none', color: 'white' }}>
              <FontAwesomeIcon icon={faTwitter} />
            </Anchor>
            <Anchor href="http://facebook.com/jvcparry" style={{ textDecoration: 'none', color: 'white' }}>
              <FontAwesomeIcon icon={faFacebook} />
            </Anchor>
            <Anchor href="https://www.dmsguild.com/browse.php?author=jvc+parry" style={{ textDecoration: 'none', color: 'white' }}>
              <FontAwesomeIcon icon={faDAndD} />
            </Anchor>
            <Anchor href="https://www.patreon.com/JVCParry" style={{ textDecoration: 'none', color: 'white' }}>
              <FontAwesomeIcon icon={faPatreon} />
            </Anchor>
          </Div>
          <Text tag='p' textSize='body' textAlign={{ xs: 'center' }} align={{ xs: 'center' }} justify={{ xs: 'center' }} p={{ y: '0', l: '20px', r: { xs: '20px', md: '0' } }} m={{ xs: '15px auto', md: 'auto' }} textColor='white'>
            © {currentYear} JVC Parry - Built with React
          </Text>
        </Div>
        <Div className='FooterLeft' w={{ sm: '80%', md: '40%' }} m={{ x: '20px' }}>
          <Text tag='p' textSize='body' textAlign={{ xs: 'center', md: 'left' }} align={{ xs: 'center' }} justify={{ xs: 'center' }} p={{ y: '0', l: { xs: '20px', md: '0' }, r: { xs: '20px', md: '0' } }} m={{ xs: '15px auto', md: 'auto' }} textColor='white'>
            Subscribe to my newsletter:
          </Text>
          <NewsletterForm />
        </Div>
      </Container>
    </>
  );
};

export default Footer;