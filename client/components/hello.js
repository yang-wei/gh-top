var React = require('react');

var Hello = React.createClass({
  render: function() {
    return (
      <h3 className="da">JSX is Working {this.props.text}</h3>
    );
  }
});

module.exports = Hello
