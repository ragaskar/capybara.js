//= require_self
//= require_tree ./capybara
var Capybara = {
  installJasmineMatchers: function(scope) {
    scope.addMatchers(Capybara.JasmineMatchers);
  }
};
