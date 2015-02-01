'use strict'
var React = require('react/addons'); 
var LanguageBarComp = require('../languageBar');
var TestUtils = React.addons.TestUtils;
var assert = require('assert');
var sinon = require('sinon');

describe('LanguageBar testing', function() {

  it('Should render language bar', function() {
    var languages = [
						{ search: 'all', label: 'All'}, 
            { search: 'javascript', label: 'JavaScript'}, 
            { search: 'java', label: 'Java'}, 
            { search: 'css', label: 'CSS'}
    ]; 

    var LanguageBarFactory = React.createFactory(LanguageBarComp); 
    var LanguageBar = LanguageBarFactory({
      languages: languages,
      changeLang: sinon.spy() 
    });
    var Body = document.getElementsByTagName('body')[0];

    // Now render it
    var renderedComponent = React.render(LanguageBar, Body); 

    var ul = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, 'ul');
    assert.equal(ul.length, 1);

    var li = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, 'li');
    assert.equal(li.length, languages.length);

    var links = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, 'a');
    assert.equal(links.length, languages.length);
    
    assert(!renderedComponent.props.changeLang.called);
    TestUtils.Simulate.click(links[1]);
    assert(renderedComponent.props.changeLang.called)

  });

})
