Capybara.JasmineMatchers.toHaveCss = function(selector) {
  this.message =  function() {
    if (!this.actual.isPage || !this.actual.isPage()) {
      var msg = "Called toHaveCss on an object that is not a Capybara.Page";
      return [msg, msg];
    }
    return [
      "Expected " + $(this.actual).outerHtml + " to have css '" + selector + "'",
      "Expected " + $(this.actual).outerHtml + " not to have css '" + selector + "'"
    ];
  };
  if (!this.actual.isPage || !this.actual.isPage()) {
    if (jasmine && jasmine.JQuery && jasmine.JQuery.matchersClass && jasmine.JQuery.matchersClass.toHaveCss) {
      return jasmine.JQuery.matchersClass.toHaveCss.apply(this, arguments);
    } else {
      return false;
    }
  }
  return $(selector, this.actual).length > 0;
};

