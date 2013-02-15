Capybara.JasmineMatchers.toHaveContent = function(text) {
  var regex = new RegExp(text);
  this.message =  function() {
    return [
      "Expected " + $(this.actual).html() + " to have content '" + text + "'",
      "Expected " + $(this.actual).html() + " not to have content '" + text + "'"
    ];
  };
  return regex.test(this.actual.text().replace(/\n/g, ''));
};
