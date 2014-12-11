'use strict';

var React = require('react');
var d3 = require('d3');
var _ = require('lodash');

var Cell = React.createClass({
    render: function() {

    var cellStyle = {
        left: this.props.left,
        top: this.props.top,
        width: this.props.width,
        height: this.props.height,
        background: this.props.bgColor,
        overflow: 'hidden',
        position: 'absolute'
      };

    return (
      <div style={cellStyle} className='cell' >
      {this.props.children}
      </div>
    )
  }
})

var tree = {
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

var DataSeries = React.createClass({
  render: function() {
        var color = d3.scale.category10();
        var treemap = d3.layout.treemap().size([400, 400]).sticky(true).value(function(d) { return d.size }); 

        var treemapData = treemap(tree);
        var maps = treemapData.map(function(tree, i) {
           return (
                  <Cell
                    left={tree.x} top={tree.y}    
                    width={tree.dx} height={tree.dy}
                    key={i} bgColor={color(i)}> 
                  {tree.name}
                  </Cell>
                  )
        });
        
        return (
          <div className='dataseries'>{maps}</div>
      )
  }
});

var Treemap = React.createClass({
  render: function() {
    var style = {
      width: 600,
      height: 300,
      position: 'relative'
    };
    return (
      <div style={style}>
        <DataSeries />
      </div>
    )
  }
});

module.exports = Treemap;
