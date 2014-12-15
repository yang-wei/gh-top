'use strict'

describe('Treemap testing', function() {
  var dummyTree;

  before(function() {
    dummyTree = {
      name: "tree",
      children: [
          { name: "Word-wrapping comes for free in HTML", size: 16000 },
          { name: "animate makes things fun", size: 8000 },
          { name: "data data everywhere...", size: 5220 },
          { name: "display something beautiful", size: 3623 },
          { name: "flex your muscles", size: 984 },
          { name: "physics is religion", size: 6410 },
          { name: "query and you get the answer", size: 2124 }
      ]
    };
  });

  it('Should render component', function() {
    var React = require('react/addons'); 
    var TreemapComp = require('../treemap');
    var TestUtils = React.addons.TestUtils;
    var assert = require('assert');

    //var treemap = TestUtils.renderIntoDocument(<TreemapComp width={500} height={300} data={dummyTree} value='size' />);
    assert.ok(true);
    //var tree = TestUtils.scryRenderedDOMComponentsWithClass(treemap, 'cell'); 
    //assert.equal(TestUtils.isCompositeComponent(treemap), true);

    //assert.equal(tree.length , dummyTree.children.length);

  })
})
