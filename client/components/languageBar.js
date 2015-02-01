'use strict';
var React = require('react/addons');
var languages = require('../../server/languages');
var cx = React.addons.classSet;

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      lang: 'All',
      languages: languages
    }
  },

  componentWillReceiveProps: function(props) {
    // do something
  },

  handleChange: function(e) {
    if(e.target && e.target.nodeName === 'A') {
      var lang = encodeURIComponent(e.target.textContent);
      this.props.changeLang(lang);
    }
  },     
  render: function() {
    var options = this.props.languages.map(function(lang, i) { 
      var isActive = cx({
        'active': lang.label === this.props.lang
      });
      return (
        <li key={i} lang={lang.search}><a href='#' className={isActive} >{lang.label}</a></li>
      )
    }.bind(this));
    return (
      <ul className='language-bar' onClick={this.handleChange}>
        {options}
      </ul>
    ) 
  }
});
