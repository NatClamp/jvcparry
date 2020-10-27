import React from 'react'
import { Row, Anchor, Div, Icon } from "atomize";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import CftDSlider from '../images/CftD_Slider.jpg';
import DRSlider from '../images/DR_Slider.jpg';
import DrakarSlider from '../images/Drakar_Slider.jpg';
import GrimmSlider from '../images/Grimm_Slider.jpg';
import TDRSlider from '../images/TDR_Slider.jpg';

const Feature = () => {

  return (
    <Row d={{ xs: 'none', lg: 'flex' }} justify='center' align='center' p={{ b: '2rem' }} >
      <CarouselProvider
        naturalSlideHeight={1000}
        naturalSlideWidth={500}
        totalSlides={5}
        orientation="horizontal"
        infinite={true}
        isIntrinsicHeight
      >
        <Div className='sliderContainer'>
          <Slider className='slider' >
            <Slide index="0"><Anchor target="_blank" href='https://www.dmsguild.com/product/280922/Call-from-the-Deep?affiliate_rem=819295'><img src={CftDSlider} alt="Call from the deep description" /></Anchor></Slide>
            <Slide index="1"><Anchor target="_blank" href='https://www.dmsguild.com/product/323832/Dragon-Relics?affiliate_rem=819295'><img src={DRSlider} alt="Dragon Relics description" /></Anchor></Slide>
            <Slide index="2"><Anchor target="_blank" href='https://www.kickstarter.com/projects/jvcparry/drakar'><img src={DrakarSlider} alt="Drakar description" /></Anchor></Slide>
            <Slide index="3"><Anchor target="_blank" href='https://www.dmsguild.com/product/224651/Grimm-Encounters?affiliate_rem=819295'><img src={GrimmSlider} alt="Grimm Encounters description" /></Anchor></Slide>
            <Slide index="4"><Anchor target="_blank" href='https://jvcparry.itch.io/the-dead-rise'><img src={TDRSlider} alt="The dead rise description" /></Anchor></Slide>
          </Slider>
          <ButtonBack className='slider__button slider__button--back'><Icon name="Back" color="black" size="20px" /></ButtonBack>
          <ButtonNext className='slider__button slider__button--next'><Icon name="Next" color="black" size="20px" /></ButtonNext>
        </Div>
      </CarouselProvider >
    </Row>
  )
}

export default Feature
