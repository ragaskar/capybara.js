Capybara.Page = function(html) {
  var $html = $(html);

  function safeId(locator) {
    return locator.replace('!', '');
  }

  return $html.extend({
    fillIn: function(locator) {
      var label = $('label:contains(' +locator + ')', $html),
      inputById = $('input#' + safeId(locator), $html),
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
      };
    },
    clickButton: function(locator) {
      var buttonById = $('button#' + safeId(locator), $html),
      buttonByValue = $('button[value=\'' + locator +'\']', $html),
      inputById = $('input#' + safeId(locator) + '[type=\'submit\']', $html),
      inputByValue = $('input[type=\'submit\'][value=\'' + locator + '\']', $html),
      buttonByText = $('button:contains(' +locator + ')', $html),
      button = buttonById.add(buttonByValue).add(inputById).add(inputByValue).add(buttonByText).first();
      if (!button.length) {
        throw "Button for '" + locator + "' not found in " + $html.html();
      }
      button.click();
    },
    isPage: function() {
      return true;
    }
  });

};
