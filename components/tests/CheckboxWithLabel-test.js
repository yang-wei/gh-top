describe('CheckboxWithLabel', function() {
    
    beforeEach(function() {
      require('./helper.js').initDOM;       
    })

    afterEach(function() {
      require('./helper.js').cleanDOM;
    });

    it('changes the text after click', function() {
      var React = require('react/addons');
      var CheckboxWithLabel = require('../CheckboxWithLabel.js');
      var TestUtils = React.addons.TestUtils;
      var assert = require('assert');

      // Render a checkbox with label in the document
      var checkbox = TestUtils.renderIntoDocument(
        <CheckboxWithLabel labelOn="On" labelOff="Off" />
        );

      // Verify that it's Off by default
      var label = TestUtils.findRenderedDOMComponentWithTag(
        checkbox, 'label');
      assert(label.getDOMNode().textContent, 'Off');

      // Simulate a click and verify that it is now On
      var input = TestUtils.findRenderedDOMComponentWithTag(
        checkbox, 'input');
      TestUtils.Simulate.change(input);
      assert(label.getDOMNode().textContent, 'On');
      });
});
