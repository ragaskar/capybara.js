Capybara.Page = function(html) {
  var $html = $(html);
  return $html.extend({
    fillIn: function(locator) {
      var label = $('label:contains(' +locator + ')', $html),
      inputById = $('input#' + locator, $html),
      inputByName = $('input[name=\'' + locator + '\']', $html),
      inputByLabelWithFor = $('#' + label.attr('for'), $html),
      inputByLabelWithoutFor = $('input', label),
      input = inputById.add(inputByName).add(inputByLabelWithFor).add(inputByLabelWithoutFor).first();
      if (!input.length) {
        throw "Input for '" + locator + "' not found in " + $html.html();
      }
      return {
        with: function(val) {
          input.val(val);
        }
      }
    }
  });
}
