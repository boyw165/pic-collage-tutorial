'use strict';

import $ from 'jquery';
import React from 'react';
import Slider from 'react-slick';
import TweenMax from 'TweenMax';
import TimelineMax from 'TimelineMax';

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
  }

  componentDidMount() {
    // Handler resize event.
    window.addEventListener('resize', this.onResize.bind(this));
    this.onResize();

    // Animation for slide #1.
    this.t0.add(TweenMax.fromTo('#slide-0-1', 0.8, {opacity: 0},
                                {opacity: 1}), 0.0);
    this.t0.add(TweenMax.fromTo('#slide-0-2', 0.8, {opacity: 0},
                                {opacity: 1}), 0.2);
    this.t0.add(TweenMax.fromTo('#slide-0-3', 0.8, {opacity: 0},
                                {opacity: 1}), 0.4);
    this.t0.play();
    // Animation for slide #2.
    this.t1.add(TweenMax.fromTo('#slide-1-3', 0.4, {opacity: 0, left: '4%', top: '21%'},
                                {opacity: 1, left: '0%', top: '19%'}), 0.0);
    this.t1.add(TweenMax.fromTo('#slide-1-2', 0.4, {opacity: 0},
                                {opacity: 1}), 0.2);
    this.t1.add(TweenMax.to('#slide-1-2', 0.4, {opacity: 0}), 0.6);
    this.t1.add(TweenMax.fromTo('#slide-1-1', 0.4, {opacity: 0, top: '-14%'},
                                {opacity: 1, top: '-18%'}), 0.5);
    this.t1.pause(0);
    // Animation for slide #3.
    this.t2.add(TweenMax.fromTo('#slide-2-1', 0.3, {opacity: 0},
                                {opacity: 1}), 0.0);
    this.t2.add(TweenMax.to('#slide-2-1', 0.4, {opacity: 0}), 0.5);
    this.t2.add(TweenMax.fromTo('#slide-2-2', 0.4, {opacity: 0, top: '-29%'},
                                {opacity: 1, top: '-25%'}), 0.5);
    this.t2.pause(0);
    // Animation for slide #4.
    this.t3.add(TweenMax.fromTo('#slide-3-1', 0.4, {opacity: 0, top: '-11%'},
                                {opacity: 1, top: '-15%'}), 0.0);
    this.t3.add(TweenMax.fromTo('#slide-3-2', 0.4, {opacity: 0, top: '-26%'},
                                {opacity: 1, top: '-30%'}), 0.2);
    this.t3.add(TweenMax.fromTo('#slide-3-3', 0.4, {opacity: 0, top: '-30%'},
                                {opacity: 1, top: '-33%'}), 0.3);
    this.t3.add(TweenMax.fromTo('#slide-3-4', 0.4, {opacity: 0, top: '-12%'},
                                {opacity: 1, top: '-16%'}), 0.4);
    this.t3.add(TweenMax.fromTo('#slide-3-5', 0.4, {opacity: 0, top: '41%'},
                                {opacity: 1, top: '37%'}), 0.6);
    this.t3.pause(0);

    // WORKAROUND: Add listener to the next-button of react-slick.
    $('.slick-next').on('click', this.genericNextHandler.bind(this));

    // DEBUG usage.
    window.$ = $;
    window.TweenMax = TweenMax;
    window.TimelineMax = TimelineMax;
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
          <div style={{backgroundImage: 'url("images/bg_tutorial_1.png")'}}
               id='slide-0-0'
               className='bounding-box match-parent'/>
          <div className='center-box'>
            <img src='images/im_tutorial_template.png'
                 id='slide-0-1'
                 style={{left: '-20%', top: '-43%', height: '30.04%'}}
                 className='absolute'/>
            <img src='images/im_tutorial_grid.png'
                 id='slide-0-2'
                 style={{left: '-40%', top: '0', height: '28.87%'}}
                 className='absolute'/>
            <img src='images/im_tutorial_freestyle.png'
                 id='slide-0-3'
                 style={{left: '8%', top: '-2%', height: '29.63%'}}
                 className='absolute'/>
          </div>
          <button id='next-0'
                  className='next-button transparent absolute'>
            Next
          </button>
        </div>

        <div style={this.state.slideHeight}>
          <div style={{backgroundImage: 'url("images/bg_tutorial_2.png")'}}
               id='slide-1-0'
               className='bounding-box match-parent'/>
          <div className='center-box'>
            <img src='images/im_tutorial_tool.png'
                 id='slide-1-1'
                 style={{left: '-31.5%', top: '-18%', height: '34.15%'}}
                 className='absolute'/>
            <img src='images/im_tutorial_tap.png'
                 id='slide-1-2'
                 style={{left: '-6%', top: '16.4%', height: '7.45%'}}
                 className='absolute'/>
            <img src='images/im_tutorial_hand.png'
                 id='slide-1-3'
                 style={{left: '0', top: '19%', height: '10.74%'}}
                 className='absolute'/>
          </div>
          <button id='next-1'
                  className='next-button transparent absolute'>
            Next
          </button>
        </div>

        <div style={this.state.slideHeight}>
          <div style={{backgroundImage: 'url("images/bg_tutorial_3.png")'}}
               id='slide-2-0'
               className='bounding-box match-parent'/>
          <div className='center-box'>
            <img src='images/im_tutorial_tap.png'
                 id='slide-2-1'
                 style={{left: '-6%', top: '-28.5%', height: '7.45%'}}
                 className='absolute'/>
            <img src='images/im_tutorial_editor.png'
                 id='slide-2-2'
                 style={{left: '-31%', top: '-25%', height: '35.15%'}}
                 className='absolute'/>
          </div>
          <button id='next-2'
                  className='next-button transparent absolute'>
            Next
          </button>
        </div>

        <div style={this.state.slideHeight}>
          <div style={{backgroundImage: 'url("images/bg_tutorial_4.png")'}}
               id='slide-3-0'
               className='bounding-box match-parent'/>
          <div className='center-box'>
            <img src='images/im_tutorial_twitter.png'
                 id='slide-3-1'
                 style={{left: '-45%', top: '-15%', height: '10.03%'}}
                 className='absolute'/>
            <img src='images/im_tutorial_instag.png'
                 id='slide-3-2'
                 style={{left: '-40%', top: '-30%', height: '15.26%'}}
                 className='absolute'/>
            <img src='images/im_tutorial_fb.png'
                 id='slide-3-3'
                 style={{left: '25%', top: '-33%', height: '13.50%'}}
                 className='absolute'/>
            <img src='images/im_tutorial_picola.png'
                 id='slide-3-4'
                 style={{left: '18%', top: '-16%', height: '14.73%'}}
                 className='absolute'/>
            <img src='images/bn_tutorial_start.png'
                 id='slide-3-5'
                 style={{left: '-26%', top: '37%', height: '8.27%'}}
                 className='absolute'/>
          </div>
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
      var totalHeight = $(window).height();

      this.setState({
        slideHeight: {
          height: totalHeight
        }
      });
    }
  }
}
