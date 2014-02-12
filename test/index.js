/*
 * Module dependencies.
 */

var plugin = require('..');
var should = require('should');
var rework = require('rework');
var readdir = require('fs').readdirSync;
var read = require('fs').readFileSync;

/**
 * Various plugin matches.
 */

var matches = {
  '^__': false,
  '^--': '-vendor-'
};

describe('media-selectors', function(){
  readdir('test/cases').forEach(function(file){
    if (~file.indexOf('.out')) return;
    if (!~file.indexOf('simple')) return;

    var exec = /([a-z-]+)\./.exec(file);          // foo-bar.css
    var split = exec[1].split('-');               // ['foo', 'bar']
    var full = exec[1];                           // 'foo-bar'
    var base = split[0]                           // 'foo'
    var title = split.join(' ') + ' should work'; // 'foo bar should work'

    it(title, function(){
      var raw = read('test/cases/' + full + '.css', 'utf8').trim();
      var out = read('test/cases/' + base + '.out.css', 'utf8').trim();

      var rw = rework(raw)
        .use(rework.references())
        .use(plugin(matches))
        .toString();

      // console.log('\nREWORK\n', rw);
      // console.log('\nRAW\n', raw);
      // console.log('\nOUT\n', out);

      rw.should.equal(out);
    });
  });
});
