import React from 'react';
import {
  Row, Anchor, Div, Icon,
} from 'atomize';
import {
  CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import CftDSlider from '../images/CftD_Slider.jpg';
import DRSlider from '../images/DR_Slider.jpg';
import DrakarSlider from '../images/Drakar_Slider.jpg';
import UTSlider from '../images/UT_Slider.jpg';
import PeculiarSlider from '../images/Peculiar_Slider.jpg';

const Feature = () => (
  <Row d={{ xs: 'none', lg: 'flex' }} justify="center" align="center" p={{ b: '2rem' }}>
    <CarouselProvider
      naturalSlideHeight={1000}
      naturalSlideWidth={500}
      totalSlides={5}
      orientation="horizontal"
      infinite
      isIntrinsicHeight
    >
      <Div className="sliderContainer">
        <Slider className="slider">
          <Slide index="0"><Anchor target="_blank" href="https://www.kickstarter.com/projects/jvcparry/peculiar-children"><img src={PeculiarSlider} alt="Peculiar Children" /></Anchor></Slide>
          <Slide index="1"><Anchor target="_blank" href="https://www.dmsguild.com/product/280922/Call-from-the-Deep?affiliate_rem=819295"><img src={CftDSlider} alt="Call from the deep" /></Anchor></Slide>
          <Slide index="2"><Anchor target="_blank" href="https://jvcparry.com/product/Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU5MjQ2Mzk2Mzc2NTg="><img src={DrakarSlider} alt="Drakar" /></Anchor></Slide>
          <Slide index="3"><Anchor target="_blank" href="https://jvcparry.com/product/Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzYxMjQxNjU3OTE4OTg="><img src={UTSlider} alt="Drakar Unlocked Treasures" /></Anchor></Slide>
          <Slide index="4"><Anchor target="_blank" href="https://www.dmsguild.com/product/323832/Dragon-Relics?affiliate_rem=819295"><img src={DRSlider} alt="Dragon Relics" /></Anchor></Slide>
        </Slider>
        <ButtonBack className="slider__button slider__button--back"><Icon name="Back" color="black" size="20px" /></ButtonBack>
        <ButtonNext className="slider__button slider__button--next"><Icon name="Next" color="black" size="20px" /></ButtonNext>
      </Div>
    </CarouselProvider>
  </Row>
);

export default Feature;
