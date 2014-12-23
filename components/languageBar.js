'use strict';
var React = require('react');

module.exports = React.createClass({
  handleChange: function(e) {
    this.props.changeLang(e.target.textContent);
  },     
  render: function() {
    var languages = ['All', 'JavaScript', 'PHP', 'Ruby']; 
    var options = languages.map(function(lang, i) { 
      return (
        <li key={i} lang={lang}><a href='#' >{lang}</a></li>
      )
    }.bind(this));
    return (
      <ul onClick={this.handleChange}>
        {options}
      </ul>
    ) 
  }
});
