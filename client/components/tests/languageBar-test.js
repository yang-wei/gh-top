'use strict'
var React = require('react/addons'); 
var LanguageBarComp = require('../languageBar');
var TestUtils = React.addons.TestUtils;
var assert = require('assert');

describe('LanguageBar testing', function() {

  it('Should render language bar', function() {
    var languages = ['JavaScript', 'PHP', 'CSS'];
    var LanguageBarFactory = React.createFactory(LanguageBarComp); 
    var LanguageBar = LanguageBarFactory({
      lang: languages 
    });
    var Body = document.getElementsByTagName('body')[0];

    // Now render it
    var renderedComponent = React.render(LanguageBar, Body); 

    var li = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, 'li');
    assert(li.length, languages.length);
  })

})
