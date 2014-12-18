'use strict';

var React = require('react');
var d3 = require('d3');

var Cell = React.createClass({
    render: function() {

      var cellStyle = {
          left: this.props.left,
          top: this.props.top,
          width: this.props.width,
          height: this.props.height,
          overflow: 'hidden',
          position: 'absolute'
        };

    return (
      <div style={cellStyle} className={this.props.cellColor} >
        {this.props.children}
      </div>
    );
  }
});

var DataSeries = React.createClass({
  getMaxProp: function(arr, prop) {
    return arr.reduce(function(x, y) {
      return x[prop] > y[prop] ? x : y;
    });
  },
  getMinProp: function(arr, prop) {
    return arr.reduce(function(x,y) {
      return x[prop] > y[prop] ? y : x;
    })
  },
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
        var minStarRepo = this.getMinProp(data, 'stars');
        var maxStarRepo = this.getMaxProp(data, 'stars');

        var quantize = d3.scale.quantize()
                          .domain(d3.range(minStarRepo.stars, maxStarRepo.stars))
                          .range(d3.range(9).map(function(i) { 
                            return 'q' + i + '-9';
                          }));
        console.log(quantize(1999));
        var treemap = d3.layout.treemap()
                        .children(function(d) { return d })
                        .size([this.props.width, this.props.height])
                        .sticky(true)
                        .value(function(d) { return d[value] }); 

        var maps = treemap(data).map(function(tree, i) {
           var cellColor = quantize(tree.stars);
           return (
                  <Cell
                    left={tree.x} top={tree.y}    
                    width={tree.dx} height={tree.dy}
                    key={i} cellColor={cellColor}> 
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
  getDefaultProps: function() {
    return {
      data: [], 
      width: '600',
      height: '300',
      value: ''
    }
  },
  render: function() {
    var style = {
      position: 'relative'
    };
    return (
      <div style={style}>
        <DataSeries data={this.props.data} value={this.props.value} width={this.props.width} height={this.props.height}/>
      </div>
    )
  }
});

module.exports = Treemap;
