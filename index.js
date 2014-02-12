/*
 * Module dependencies.
 */

var walk = require('rework-walk');

/**
 * Expose `media`.
 */

module.exports = media;

/**
 * Define rework plugin `media`.
 * @param {Object} options
 */

function media(options) {
  var opts = {};
  switch (typeof options) {
    case 'undefined':
      return;
    case 'string':
      opts[options] = false;
      break;
    case 'object':
      opts = options;
      break;
  };

  return function(style) {
    var self = this;
    walk(style, function(rule, node) {
      if (!rule.declarations) return rule;
      rule.declarations = rule.declarations.filter(function(decl, i) {
        var prop = decl.property;
        var key, val, re, alt;
        for (key in opts) {
          re = new RegExp(key);
          val = opts[key] || '';
          alt = prop.replace(re, val);
          if (alt === prop) continue;
          if (!val) return;
          prop = alt;
        }
        return decl.property = prop;
      });
    });
  };
}
