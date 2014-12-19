'use strict';

var React = require('react');
var Treemap = require('./components/treemap');

var App = React.createClass({
    getDefaultProps: function() {
      return { 
        data: [],
        value: ''
      }
    },
    render: function() {
      return (
        <html>
          <head>
            <link href='./public/style.css' rel='stylesheet' />
          </head>
          <body>
            <header>
              <h1>Github Repository in Treemap</h1>
            </header>
            <div className='treemap-container'>
              <Treemap width={960} height={500} 
                      data={this.props.data} 
                      value={this.props.value} />
            </div>
            <script src='./public/bundle.js'></script>
          </body>
        </html>
      );
    }
  });

module.exports = App;

if (typeof window !== 'undefined') {
  window.onload = function() {
   React.render(<App />, document);
  }
}
