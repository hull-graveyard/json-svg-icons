"use strict";
/*global module*/

var byte2Hex = function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F, 1);
};

var rgb2color = function rgb2color(r, g, b) {
  return "#" + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
};

var getRainbow = function getRainbow(steps, phase) {
  var rainbow = [];
  if (phase === undefined){phase = 0; }
  var center = 128;
  var width = 127;
  var frequency = Math.PI*2/steps;
  for (var i = 0; i < steps; ++i) {
     var red   = Math.sin(frequency*i+2+phase) * width + center;
     var green = Math.sin(frequency*i+0+phase) * width + center;
     var blue  = Math.sin(frequency*i+4+phase) * width + center;
     rainbow.push(rgb2color(red, green, blue));
  }
  return rainbow;
};

module.exports = getRainbow;
