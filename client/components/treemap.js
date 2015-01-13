'use strict';

var React = require('react');
var d3 = require('d3');
var superagent = require('superagent');

var Cell = React.createClass({
   render: function() {
    var textStyle = {
      'textAnchor': 'middle'
    };
    var t = 'translate(' + this.props.x + ',' + this.props.y + ')';
    return (
      <g transform={t}>
        <rect 
          fill={this.props.fill}
          width={this.props.width}
          height={this.props.height}
        />
        <text
          x={this.props.width / 2} 
          y={this.props.height / 2}
          dy='.35em'
          style={textStyle}
        >
          {this.props.label}
        </text>
      </g>
    );
  }
});

var DataSeries = React.createClass({
  getDefaultProps: function() {
    return {
      data: [],
      width: '', 
      height: '',
      value: ''
    };
  },

  render: function() {
    var value = this.props.value;
    var data = this.props.data;
    var color = d3.scale.category20b();
    var treemap = d3.layout.treemap()
                    .children(function(d) { return d })
                    .size([this.props.width, this.props.height])
                    .sticky(true)
                    .value(function(d) { return d[value]}); 

      var cells = treemap(data).map(function(tree, i) {
         return (
                <Cell
                  fill={color(i)} 
                  width={tree.dx}
                  height={tree.dy}
                  x={tree.x} 
                  y={tree.y}    
                  label={tree.name}
                  key={i} 
                > 
                </Cell>
                )
      }, this);

      return (
        <g className='dataseries'>{cells}</g>
      )
  }
});

var Treemap = React.createClass({
  getDefaultProps: function() {
    return {
      data: [],
      lang: 'All',
      width: '600',
      height: '300',
      value: 'stars'
    }
  },
 render: function() {
    return (
      <svg width={this.props.width} height={this.props.height}>
        <DataSeries width={this.props.width} height={this.props.height} data={this.props.data} value={this.props.value} />
      </svg>
    )
  }
});

module.exports = Treemap;
