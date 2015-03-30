"use strict";
/*global module,import*/

import React from "react";
import assign from "object-assign";
import _ from "underscore";
import getRainbow from "./rainbows";
import Icons from "../dist/index.js";

function parseLevel(level, opts){
  var [tag, attributes, ...children] = level;
  if(_.isArray(children) && children.length){
    children = children.map(function(child){
      return parseLevel(child, opts);
    });
  }
  if(attributes){
    var attrs = _.reduce(opts, function(memo, value, key){
      if(attributes[key] && attributes[key]!=='none'){
        memo[key]=value;
      }
      return memo;
    }, {});
  }
  attributes = assign({}, attributes, attrs);
  return React.createElement(tag, attributes, ...children);
}

var icons = _.reduce(Icons, function(memo, icon, name){
  memo[name] = React.createClass({
    getDefaultProps() {
      return {
        size: 24,
        settings: {}
      };
    },
    render(){
      var size  = this.props.size;
      var color = this.props.color||this.props.settings.light_color||"currentColor";
      console.log(this.props)
      // Apply some values to the root tag
      icon[1] = assign(icon[1],{
        width: `${size}`,
        height: `${size}`,
        className: `svg-icon svg-icon-${name}`,
        style: this.props.style
      });

      return parseLevel(icon, {fill: color, stroke:color});
    }
  });

  return memo;
}, {});

var App = React.createClass({
  render: function() {
    var rainbows = getRainbow(_.size(icons));
    var i = 0;
    var reactIcons  = _.map(icons, (Icon)=>{
      return <Icon style={{color: rainbows[i++]}} {...this.props}/>;
    });
    return <div>{reactIcons}</div>;
  }
});

React.render(<App/>, document.getElementById("icons"));
