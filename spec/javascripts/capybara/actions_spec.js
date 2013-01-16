describe("actions", function() {
  describe("fillIn", function() {
    it("fills in a given text field by label text when label[for] is used", function() {
      var html = $('<div><label for="my_field_1">My First Field</label><input id="my_field_1 /></div>');
      page = new Capybara.Page(html);
      expect($('#my_field_1').val()).toBe('');
      page.fill_in('My First Field').with('Foobar');
      expect($('#my_field_1').val()).toBe('Foobar');
    });
  });
});
