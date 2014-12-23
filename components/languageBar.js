'use strict';
var React = require('react');

module.exports = React.createClass({
  handleChange: function(e) {
    if(e.target && e.target.nodeName === 'A') {
      this.props.changeLang(e.target.textContent);
    }
  },     
  render: function() {
    var languages = require('../languages');
    var options = languages.map(function(lang, i) { 
      return (
        <li key={i} lang={lang}><a href='#' >{lang}</a></li>
      )
    }.bind(this));
    return (
      <ul className='language-bar' onClick={this.handleChange}>
        {options}
      </ul>
    ) 
  }
});
