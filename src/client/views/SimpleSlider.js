'use strict';

import $ from 'jquery';
import React from 'react';
import Slider from 'react-slick';
// import Carousel from 'nuka-carousel';

export default class SimpleSlider extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      style: {
        height: 500
      }
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize.bind(this));
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  render() {
    var settings = {
      dots: true,
      infinite: false,
      centerMode: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: this.onBeforeChange,
      afterChange: this.onAfterChange
    };

    return (
      <Slider {...settings}>
        <div>
          <img src="images/bg_tutorial_1.png"
               className="center"
               style={this.state.style}/>
        </div>
        <div>
          <img src="images/bg_tutorial_2.png"
               className="center"
               style={this.state.style}/>
        </div>
        <div>
          <img src="images/bg_tutorial_3.png"
               className="center"
               style={this.state.style}/>
        </div>
        <div>
          <img src="images/bg_tutorial_4.png"
               className="center"
               style={this.state.style}/>
        </div>
      </Slider>
    );
  }

  //////////////////////////////////////////////////////////////////////////////
  // Privates //////////////////////////////////////////////////////////////////

  onBeforeChange() {
    console.log(1111);
  }

  onAfterChange() {
    console.log(2222);
  }

  onResize() {
    var $window = $(window);

    if ($window) {
      var winWidth = $(window).width();
      var winHeight = $(window).height();

      this.setState({
        style: {
          height: winHeight
        }
      });
    }
  }
}
