'use strict'
var React = require('react/addons'); 
var TreemapComp = require('../treemap');
var TestUtils = React.addons.TestUtils;
var assert = require('assert');

describe('Treemap testing', function() {

  it('Should render component', function() {
    
    var fakeData = [{'name': 'test1', 'star': 10}, {'name': 'test2', 'star': 10}, {'name': 'test3', 'star': 10}];
    var TreemapFactory = React.createFactory(TreemapComp); 
    var Treemap = TreemapFactory({
      data: fakeData
    });
    var Body = document.getElementsByTagName('body')[0];

    // Now render it
    var renderedComponent = React.render(Treemap, Body); 

    var rect = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, 'rect');
    assert(rect.length, fakeData.length);
    var text = TestUtils.scryRenderedDOMComponentsWithTag(renderedComponent, 'rect');
    assert(text.length, fakeData.length);
  })

})
