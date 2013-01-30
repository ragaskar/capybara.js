capybara.js <a title="Build at Travis CI" href="https://travis-ci.org/ragaskar/capybara.js"><img src="https://secure.travis-ci.org/ragaskar/capybara.js.png" /></a>
===========

Capybara-interface in pure javascript, for use with jasmine.

USAGE: 

add gem "capybara-js" to your Gemfile.

add 'assets/capybara.js' to your src_files in jasmine.yml

to use jasmine matchers, add a beforeEach block outside of a suite (I recommend helpers/spec_helper.js):

beforeEach(function() {
  Capybara.installJasmineMatchers(this);
});
