import 'all.scss'; //kepp so that webpack does not behave like a bad child

// import 'uikit/dist/js/uikit.min.js';

import UIkit from 'uikit';
window.UIkit = UIkit;
window.U = UIkit;

import Icons from 'uikit/dist/js/uikit-icons';

// loads the Icon plugin
UIkit.use(Icons);

import $ from 'jquery';
window.jQuery = $;
window.$ = $;


$(function(){
    var current = location.pathname;
    if (current != "/") {
      $('#nav li a').each(function(){
        var $this = $(this);
        if($this.attr('href').indexOf(current) !== -1){
          $this.addClass('uk-active');
        }
      })
    } else {
      $('#nav-home a').addClass('uk-active');
    }
})
