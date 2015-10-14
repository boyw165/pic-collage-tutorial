'use strict';

import $ from 'jquery';
import React from 'react';
import Slider from 'react-slick';
// import gsap from 'gsap';
// import TweenMax from 'TweenMax';
// import TimelineMax from 'TimelineMax';

const MAX_SLIDES = 4;

export default class SimpleSlider extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      slideHeight: {
        height: '100%'
      }
    };

    this.currentSlide = 0;

    // Init the animation managers.
    this.t0 = new TimelineLite({paused: true});
    this.t1 = new TimelineLite({paused: true});
    this.t2 = new TimelineLite({paused: true});
    this.t3 = new TimelineLite({paused: true});

    // Scale dictionary.
    this.scale = {
      '#slide-0-1': 0.2801,
      '#slide-0-2': 0.2887,
      '#slide-0-3': 0.2987,

      '#slide-1-1': 0.3415,
      '#slide-1-2': 0.0745,
      '#slide-1-3': 0.1074,

      '#slide-2-1': 0.0745,
      '#slide-2-2': 0.0745,
      '#slide-2-3': 0.3515,

      '#slide-3-1': 0.0903,
      '#slide-3-2': 0.1326,
      '#slide-3-3': 0.1050,
      '#slide-3-4': 0.1373,
      '#slide-3-5': 0.0827,
    };
  }

  componentDidMount() {
    // Handler resize event.
    window.addEventListener('resize', this.onResize.bind(this));
    this.onResize();

    // WORKAROUND: Add listener to the next-button of react-slick.
    $('.slick-next').on('click', this.genericNextHandler.bind(this));

    // Animation for slide #1.
    this.t0.add(TweenMax.fromTo('#slide-0-1', 0.8, {opacity: 0, top: '16%'},
                                {opacity: 1, top: '8%', ease: Back.easeOut}), 0.0);
    this.t0.add(TweenMax.fromTo('#slide-0-2', 0.8, {opacity: 0, top: '41%'},
                                {opacity: 1, top: '49%', ease: Back.easeOut}), 0.2);
    this.t0.add(TweenMax.fromTo('#slide-0-3', 0.8, {opacity: 0, top: '41%'},
                                {opacity: 1, top: '49%', ease: Back.easeOut}), 0.4);
    this.t0.play();
    // Animation for slide #2.
    this.t1.add(TweenMax.fromTo('#slide-1-3', 0.4, {opacity: 0, left: '54%', top: '74%'},
                                {opacity: 1, left: '50%', top: '70%'}), 0.0);
    this.t1.add(TweenMax.fromTo('#slide-1-2', 0.1, {opacity: 0, scale: 1},
                                {opacity: 1}), 0.3);
    this.t1.add(TweenMax.to('#slide-1-2', 0.8, {opacity: 0, scale: 2}), 0.4);
    this.t1.add(TweenMax.fromTo('#slide-1-1', 0.8, {opacity: 0, top: '40%'},
                                {opacity: 1, top: '32%', ease: Back.easeOut}), 0.6);
    this.t1.pause(0);
    // Animation for slide #3.
    this.t2.add(TweenMax.fromTo('#slide-2-1', 0.1, {opacity: 0, scale: 1},
                                {opacity: 1}), 0.0);
    this.t2.add(TweenMax.fromTo('#slide-2-2', 0.1, {opacity: 0, scale: 2},
                                {opacity: 1}), 0.1);
    this.t2.add(TweenMax.to('#slide-2-1', 1.6, {opacity: 0, scale: 1}), 0.1);
    this.t2.add(TweenMax.to('#slide-2-2', 0.8, {opacity: 0, scale: 3}), 0.2);
    this.t2.add(TweenMax.fromTo('#slide-2-3', 0.8, {opacity: 0, top: '3%'},
                                {opacity: 1, top: '11%', ease: Back.easeOut}), 0.4);
    this.t2.pause(0);
    // Animation for slide #4.
    this.t3.add(TweenMax.fromTo('#slide-3-1', 0.6, {opacity: 0, top: '42%'},
                                {opacity: 1, top: '38%'}), 0.0);
    this.t3.add(TweenMax.fromTo('#slide-3-2', 0.6, {opacity: 0, top: '27%'},
                                {opacity: 1, top: '23%'}), 0.2);
    this.t3.add(TweenMax.fromTo('#slide-3-3', 0.6, {opacity: 0, top: '21%'},
                                {opacity: 1, top: '17%'}), 0.3);
    this.t3.add(TweenMax.fromTo('#slide-3-4', 0.6, {opacity: 0, top: '39%'},
                                {opacity: 1, top: '35%'}), 0.4);
    this.t3.add(TweenMax.fromTo('#slide-3-5', 1.2, {opacity: 0, top: '100%'},
                                {opacity: 1, top: '87%', ease: Elastic.easeOut}), 0.4);
    this.t3.pause(0);

    // DEBUG usage.
    window.$ = $;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  render() {
    var settings = {
      arrows: true,
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: this.onBeforeChange.bind(this),
      afterChange: this.onAfterChange.bind(this)
    };

    // Embed the most bottom image as background image in the <div/>. So that we
    // can fit the image to just cover the given boundings.
    return (
      <Slider {...settings}>
        <div style={this.state.slideHeight}>
          <div style={{backgroundImage: 'url("images/bg_color.png")'}}
               className='contain-box bg-repeat-x match-parent'/>
          <div style={{backgroundImage: 'url("images/bg_tutorial_nobg_1.png")'}}
               className='cover-box bg-no-repeat match-parent'/>
            <img src='images/im_tutorial_template.png'
                 id='slide-0-1'
                 style={{left: '29%', top:'8%'}}
                 className='absolute'/>
            <img src='images/im_tutorial_grid.png'
                 id='slide-0-2'
                 style={{left: '9%', top:'49%'}}
                 className='absolute'/>
            <img src='images/im_tutorial_freestyle.png'
                 id='slide-0-3'
                 style={{left: '53%', top:'49%'}}
                 className='absolute'/>
        </div>

        <div style={this.state.slideHeight}>
          <div style={{backgroundImage: 'url("images/bg_color.png")'}}
               className='contain-box bg-repeat-x match-parent'/>
          <div style={{backgroundImage: 'url("images/bg_tutorial_nobg_2.png")'}}
               className='cover-box bg-no-repeat match-parent'/>
          <img src='images/im_tutorial_tool.png'
               id='slide-1-1'
               style={{marginLeft: 'auto', marginRight: 'auto', top: '32%'}}
               className='relative'/>
          <img src='images/im_tutorial_tap.png'
               id='slide-1-2'
               style={{marginLeft: 'auto', marginRight: 'auto', top: '32%'}}
               className='relative'/>
          <img src='images/im_tutorial_hand.png'
               id='slide-1-3'
               style={{left: '50%', top: '70%'}}
               className='absolute'/>
        </div>

        <div style={this.state.slideHeight}>
          <div style={{backgroundImage: 'url("images/bg_color.png")'}}
               className='contain-box bg-repeat-x match-parent'/>
          <div style={{backgroundImage: 'url("images/bg_tutorial_nobg_3.png")'}}
               className='cover-box bg-no-repeat match-parent'/>
          <img src='images/im_tutorial_tap.png'
               id='slide-2-1'
               style={{marginLeft: 'auto', marginRight: 'auto', top: '22%'}}
               className='relative'/>
          <img src='images/im_tutorial_tap.png'
               id='slide-2-2'
               style={{marginLeft: 'auto', marginRight: 'auto', top: '14.5%'}}
               className='relative'/>
          <img src='images/im_tutorial_editor.png'
               id='slide-2-3'
               style={{marginLeft: 'auto', marginRight: 'auto', top: '11%'}}
               className='relative'/>
        </div>

        <div style={this.state.slideHeight}>
          <div style={{backgroundImage: 'url("images/bg_color.png")'}}
               className='contain-box bg-repeat-x match-parent'/>
          <div style={{backgroundImage: 'url("images/bg_tutorial_nobg_4.png")'}}
               className='cover-box bg-no-repeat match-parent'/>
          <img src='images/im_tutorial_twitter.png'
               id='slide-3-1'
               style={{left: '6%', top: '38%'}}
               className='absolute'/>
          <img src='images/im_tutorial_instag.png'
               id='slide-3-2'
               style={{left: '8%', top: '23%'}}
               className='absolute'/>
          <img src='images/im_tutorial_fb.png'
               id='slide-3-3'
               style={{left: '77%', top: '17%'}}
               className='absolute'/>
          <img src='images/im_tutorial_picola.png'
               id='slide-3-4'
               style={{left: '67%', top: '35%'}}
               className='absolute'/>
          <img src='images/bn_tutorial_start.png'
               id='slide-3-5'
               style={{marginLeft: 'auto', marginRight: 'auto', top: '87%'}}
               className='relative'/>
        </div>
      </Slider>
    );
  }

  //////////////////////////////////////////////////////////////////////////////
  // Privates //////////////////////////////////////////////////////////////////

  onBeforeChange() {
    // Stop the animation.
    for (var i = 0; i < MAX_SLIDES; ++i) {
      var t = this['t' + i];

      t.pause();
    }
  }

  onAfterChange() {
    this.currentSlide = arguments[0];

    // Play the current slide and stop the others.
    for (var i = 0; i < MAX_SLIDES; ++i) {
      var t = this['t' + i];

      if (i === this.currentSlide) {
        t.play();
      } else {
        t.pause(0);
      }
    }
  }

  // WORKAROUND: The click handler for next-button of react-slick.
  genericNextHandler(e) {
    e.preventDefault();
    if (this.currentSlide === MAX_SLIDES - 1) {
      console.log('Navigate to app\'s link.');
      // DO SOMETHING.
    }
  }

  onResize() {
    var $window = $(window);

    if ($window) {
      var screenHeight = $(window).height();

      // The ratio of all animated elements.
      for (var id in this.scale) {
        var $el = $(id);
        var scale = this.scale[id];

        $el.height(scale * screenHeight);
      }

      // Make sure the slide height is equal to the window height;
      this.setState({
        slideHeight: {
          height: screenHeight
        }
      });
    }
  }
}
