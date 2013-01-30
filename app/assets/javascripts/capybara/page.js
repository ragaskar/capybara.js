Capybara.Page = function(html) {
  var $html = $(html);
  return $html.extend({
    fillIn: function(labelName) {
      var label = $('label:contains(' +labelName + ')', $html),
      input = $('#' + label.attr('for'), $html).add($('input', label)).first();
      if (!label.length) {
        throw "Label with text '" + labelName + "' not found in " + $html.html();
      }
      if (!input.length) {
        throw "Input for label '" + labelName + "' not found in " + $html.html();
      }
      return {
        with: function(val) {
          input.val(val);
        }
      }
    }
  });
}
