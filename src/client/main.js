import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import SimpleSlider from './views/SimpleSlider';

$(function() {
  ReactDOM.render(
    <SimpleSlider/>,
    document.getElementById('app')
  );
});
